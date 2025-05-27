import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

type NewsItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  isRead?: boolean;
};

const NewsSection = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date to more readable form
  const formatDate = (dateString: string) => {
    return dateString; // In real app, use moment.js or date-fns to format
  };

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockData: NewsItem[] = [
        {
          id: "1",
          title: "Tổ chức hội chợ cuối tuần",
          date: "26/05/2025",
          summary:
            "Cuối tuần này sẽ diễn ra hội chợ tại sân chung cư với nhiều hoạt động hấp dẫn.",
          isRead: false,
        },
        {
          id: "2",
          title: "Thông báo bảo trì thang máy",
          date: "28/05/2025",
          summary:
            "Thang máy block A sẽ được bảo trì từ 9h đến 17h ngày 30/05/2025. Mong cư dân thông cảm.",
          isRead: true,
        },
        {
          id: "3",
          title: "Lịch thu gom rác thay đổi",
          date: "25/05/2025",
          summary:
            "Từ tháng 6/2025, lịch thu gom rác sẽ chuyển sang thứ 2, thứ 5 hàng tuần.",
          isRead: false,
        },
        {
          id: "4",
          title: "Tập huấn phòng cháy chữa cháy",
          date: "20/05/2025",
          summary:
            "Buổi tập huấn phòng cháy chữa cháy sẽ diễn ra vào ngày 05/06/2025 tại hội trường tầng 1.",
          isRead: true,
        },
        {
          id: "5",
          title: "Mời tham gia cuộc thi ảnh cư dân",
          date: "24/05/2025",
          summary:
            "Chung cư tổ chức cuộc thi ảnh đẹp dành cho cư dân với nhiều phần thưởng hấp dẫn.",
          isRead: false,
        },
      ];

      setNewsData(mockData);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Không thể tải tin tức. Vui lòng thử lại.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
  }, [fetchNews]);

  const handlePressItem = useCallback((item: NewsItem) => {
    setNewsData((prev) =>
      prev.map((news) =>
        news.id === item.id ? { ...news, isRead: true } : news
      )
    );
    // Navigation would go here in real app
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: NewsItem }) => (
      <View style={[styles.card, item.isRead && styles.readCard]}>
        <TouchableOpacity
          onPress={() => handlePressItem(item)}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          <View style={styles.cardHeader}>
            <Text
              style={[styles.title, item.isRead && styles.readTitle]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text style={styles.date}>{formatDate(item.date)}</Text>
          </View>
          <Text
            style={[styles.summary, item.isRead && styles.readSummary]}
            numberOfLines={2}
          >
            {item.summary}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [handlePressItem]
  );

  const memoizedNewsData = useMemo(() => newsData, [newsData]);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e3a8a" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchNews} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tin tức</Text>

      <FlatList
        data={memoizedNewsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#1e3a8a"
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có tin tức nào</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  readCard: {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1e40af",
  },
  readTitle: {
    color: "#4b5563",
    fontWeight: "400",
  },
  date: {
    fontSize: 12,
    color: "#64748b",
    marginLeft: 8,
  },
  summary: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  readSummary: {
    color: "#64748b",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#dc2626",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#1e40af",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  emptyText: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default React.memo(NewsSection);

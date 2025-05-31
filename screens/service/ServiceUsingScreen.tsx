import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getMyBooking } from "@/services/bookingService";
import { RegisteredService } from "@/utils/type/bookingType";
import { useLanguage } from "@/hooks/useLanguage";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppNavigator } from "@/navigation/useAppNavigate";

export default function ServiceUsingScreen() {
  const { translation } = useLanguage.getState();
  const { navigate } = useAppNavigator();
  const [bookings, setBookings] = useState<RegisteredService[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBooking();
        setBookings(response);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCardPress = (item: RegisteredService) => {
    navigate("ServiceUsingDetail", {
      serviceData: item,
    });
  };

  const calculateRemainingDays = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0); // Không âm
  };

  const renderBookingCard = ({ item }: { item: RegisteredService }) => {
    const progress = calculateProgress(item.startDate, item.endDate);
    const statusConfig = getStatusConfig(item.status);
    const DateRow = ({
      icon,
      date,
      lable,
    }: {
      icon: keyof typeof Icon.glyphMap;
      date: string;
      lable: string;
    }) => (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Icon
          name={icon}
          size={20}
          color="#6B7280"
          style={{ marginRight: 6 }}
        />
        <Text style={{ fontSize: 13, color: "#6B7280" }}>{lable}:</Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            marginLeft: 4,
            color: "#1F2937",
          }}
        >
          {formatDate(date)}
        </Text>
      </View>
    );
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.85}
      >
        {/* Header: Tên + trạng thái */}
        <View style={styles.headerRow}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.serviceName}
          </Text>
          <View style={[styles.statusBadge, statusConfig.bgColor]}>
            <Text style={styles.statusText}>
              {translation[statusConfig.label]}
            </Text>
          </View>
        </View>

        {/* Ngày bắt đầu / kết thúc */}
        <View style={styles.dateContainer}>
          <DateRow
            icon="calendar-outline"
            date={item.startDate}
            lable={translation.startDate}
          />
          <DateRow
            icon="calendar"
            date={item.endDate}
            lable={translation.endDate}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Icon
            name="clock"
            size={20}
            color="#6B7280"
            style={{ marginRight: 6 }}
          />
          <Text style={{ fontSize: 13, color: "#6B7280" }}>
            {translation.timeRemaining}:
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              marginLeft: 4,
              color: "#DC2626",
            }}
          >
            {calculateRemainingDays(item.endDate)}{" "}
            {translation.day.toLowerCase()}
          </Text>
        </View>

        {/* Progress */}
        <ProgressBar
          progress={progress}
          duration={calculateDuration(item.startDate, item.endDate)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#6B7280" }}>
              {translation.noBookings}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const ProgressBar = ({
  progress,
  duration,
}: {
  progress: number;
  duration: string;
}) => (
  <View style={styles.durationContainer}>
    <View style={styles.durationBar}>
      <View style={[styles.durationProgress, { width: `${progress}%` }]} />
    </View>
    <Text style={styles.durationText}>{duration}</Text>
  </View>
);

// Helper Functions
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();

const calculateProgress = (start: string, end: string) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now >= endDate) return 100;
  if (now <= startDate) return 0;

  const total = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  return Math.round((elapsed / total) * 100);
};

const calculateDuration = (start: string, end: string) => {
  const { translation } = useLanguage.getState();
  const diffDays = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 7) return `${diffDays} ${translation.day.toLowerCase()}`;
  if (diffDays < 30)
    return `${Math.round(diffDays / 7)} ${translation.week.toLowerCase()}`;
  return `${Math.round(diffDays / 30)} ${translation.month.toLowerCase()}`;
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { label: "Completed", bgColor: styles.statusCompleted };
    case "in_use":
      return { label: "inUse", bgColor: styles.statusInUse };
    case "pending":
      return { label: "Pending", bgColor: styles.statusPending };
    case "cancelled":
      return { label: "Cancelled", bgColor: styles.statusCancelled };
    default:
      return { label: "Unknown", bgColor: styles.statusPending };
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "700",
  },
  dateContainer: {
    flexDirection: "column",
    marginBottom: 12,
  },
  statusCompleted: {
    backgroundColor: "#d1fae5", // xanh ngọc đậm hơn
    color: "#065f46", // xanh đậm
  },
  statusInUse: {
    backgroundColor: "#0284c7", // xanh dương đậm hơn
    color: "#ffffff", // trắng
  },
  statusPending: {
    backgroundColor: "#fde68a", // vàng đậm hơn
    color: "#92400e", // cam nâu đậm
  },
  statusCancelled: {
    backgroundColor: "#fecaca", // đỏ hồng đậm hơn
    color: "#991b1b", // đỏ đậm
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 8,
  },
  durationContainer: {
    marginTop: 8,
  },
  durationBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  durationProgress: {
    height: "100%",
    backgroundColor: "#10b981",
  },
  durationText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "right",
  },
});

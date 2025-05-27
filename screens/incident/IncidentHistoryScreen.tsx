import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import CardIncident, { IncidentType } from "@/components/ui/IncidentBox";
import { getIncidentHistory } from "@/services/incidentService";
import { useFocusEffect } from "@react-navigation/native";

export default function IncidentHistoryScreen() {
  const [incidents, setIncidents] = useState<IncidentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchIncidents = async () => {
    try {
      const data = await getIncidentHistory();

      if (Array.isArray(data)) {
        setIncidents(data);
      } else if (typeof data === "object" && data !== null) {
        setIncidents([data]); // bọc object vào array
      } else {
        setIncidents([]); // hoặc null, tùy trường hợp bạn xử lý
      }

      setError(null);
    } catch (err) {
      console.error("Failed to fetch incidents:", err);
      setError("Không thể tải dữ liệu sự cố");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchIncidents();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchIncidents();
  };

  const renderItem = ({ item }: { item: IncidentType }) => (
    <CardIncident incident={item} />
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có dữ liệu sự cố nào</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3498db"]}
            tintColor="#3498db"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 300,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
  },
});

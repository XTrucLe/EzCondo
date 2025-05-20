import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type IncidentType = {
  id: string;
  user_id: string;
  title: string;
  type: string;
  description: string;
  reported_at: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  priority: "high" | "medium" | "low";
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "#ff9800";
    case "in_progress":
      return "#2196f3";
    case "resolved":
      return "#4caf50";
    case "rejected":
      return "#f44336";
    default:
      return "#9e9e9e";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return "clock-outline";
    case "in_progress":
      return "progress-clock";
    case "resolved":
      return "check-circle-outline";
    case "rejected":
      return "close-circle-outline";
    default:
      return "help-circle-outline";
  }
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case "high":
      return "Cao 🔥";
    case "medium":
      return "Trung bình ⚠️";
    case "low":
      return "Thấp 💤";
    default:
      return "Không rõ";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high":
      return "alert-circle-outline";
    case "medium":
      return "alert-outline";
    case "low":
      return "bell-sleep-outline";
    default:
      return "help-circle-outline";
  }
};

const CardIncident = ({ incident }: { incident: IncidentType }) => {
  return (
    <View style={styles.card}>
      {/* Tiêu đề và trạng thái */}
      <View style={styles.header}>
        <Text style={styles.title}>{incident.title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(incident.status) },
          ]}
        >
          <MaterialCommunityIcons
            name={getStatusIcon(incident.status)}
            size={14}
            color="#fff"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.statusText}>
            {incident.status.replace(/_/g, " ")}
          </Text>
        </View>
      </View>

      {/* Loại sự cố */}
      <Text style={styles.type}>Loại: {incident.type}</Text>

      {/* Ưu tiên */}
      <View style={styles.priorityRow}>
        <MaterialCommunityIcons
          name={getPriorityIcon(incident.priority)}
          size={14}
          color="#555"
          style={{ marginRight: 4 }}
        />
        <Text style={styles.priority}>
          Ưu tiên: {getPriorityLabel(incident.priority)}
        </Text>
      </View>

      {/* Mô tả ngắn */}
      <Text numberOfLines={2} style={styles.description}>
        {incident.description}
      </Text>

      {/* Ngày báo cáo */}
      <Text style={styles.date}>
        🕒 Báo cáo lúc: {new Date(incident.reported_at).toLocaleString()}
      </Text>
    </View>
  );
};

export default CardIncident;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
    color: "#222",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  type: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  priority: {
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 6,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});

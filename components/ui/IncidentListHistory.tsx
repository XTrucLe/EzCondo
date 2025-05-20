import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import CardIncident from "./IncidentBox";
import { IncidentHistoryType } from "@/utils/type/incidentTypes";

const IncidentListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử báo cáo sự cố</Text>
      <FlatList
        data={dummyIncidents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardIncident incident={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        horizontal
      />
    </View>
  );
};

export default IncidentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    color: "#222",
    marginTop: 20,
  },
});

export const dummyIncidents: IncidentHistoryType[] = [
  {
    id: "1",
    user_id: "u001",
    title: "Sự cố thang máy",
    type: "Thiết bị",
    description: "Thang máy không hoạt động từ tầng 5 trở lên.",
    reported_at: "2025-05-19T10:45:00Z",
    status: "in_progress",
    priority: "high",
  },
  {
    id: "2",
    user_id: "u002",
    title: "Rò rỉ nước hành lang",
    type: "Hạ tầng",
    description: "Phát hiện nước rò rỉ gần cầu thang thoát hiểm.",
    reported_at: "2025-05-18T08:30:00Z",
    status: "pending",
    priority: "medium",
  },
  {
    id: "3",
    user_id: "u003",
    title: "Mất điện đột ngột",
    type: "Điện",
    description: "Tòa B mất điện khoảng 15 phút lúc sáng.",
    reported_at: "2025-05-17T06:00:00Z",
    status: "resolved",
    priority: "high",
  },
  {
    id: "4",
    user_id: "u004",
    title: "Tiếng ồn vào ban đêm",
    type: "Khác",
    description: "Có tiếng ồn lớn từ căn hộ kế bên suốt đêm qua.",
    reported_at: "2025-05-16T23:30:00Z",
    status: "rejected",
    priority: "low",
  },
];

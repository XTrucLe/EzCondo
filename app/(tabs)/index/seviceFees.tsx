import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const mockData = [
  {
    id: "B001",
    room: "A101",
    owner: "Nguyễn Văn A",
    type: "Phí điện",
    month: "03/2025",
    createdDate: "01/04/2025",
    dueDate: "10/04/2025",
    readDate: "30/03/2025",
    startReading: 1240,
    endReading: 1320,
    usage: 80,
    amount: 350000,
    status: "unpaid",
  },
  {
    id: "B002",
    room: "A102",
    owner: "Lê Thị B",
    type: "Phí nước",
    month: "03/2025",
    createdDate: "01/04/2025",
    dueDate: "10/04/2025",
    readDate: "30/03/2025",
    startIndex: 500,
    endIndex: 535,
    usage: 35,
    amount: 120000,
    status: "paid",
    paidDate: "05/04/2025",
    paymentMethod: "MOMO",
  },
];

export default function BillListScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: any) => {
    const paid = item.status === "paid";
    return (
      <TouchableOpacity
        style={[styles.card, paid ? styles.cardPaid : styles.cardUnpaid]}
        onPress={() => navigation.navigate("feeDetail", { bill: item })}
        activeOpacity={0.8}
      >
        {/* Header: Icon + Title + Amount */}
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <Ionicons
              name={item.type.includes("nước") ? "water" : "flash"}
              size={24}
              color="#4A90E2"
            />
            <Text style={styles.title}>
              {item.type} • {item.month}
            </Text>
          </View>
          <Text style={styles.amount}>{item.amount.toLocaleString()}₫</Text>
        </View>

        {/* Sub-info: Room & Owner */}
        <Text style={styles.subInfo}>
          Phòng <Text style={styles.highlight}>{item.room}</Text> – Chủ hộ{" "}
          <Text style={styles.highlight}>{item.owner}</Text>
        </Text>

        {/* Footer: Status badge & Due/Paid Date */}
        <View style={styles.footer}>
          <View
            style={[styles.badge, paid ? styles.badgePaid : styles.badgeUnpaid]}
          >
            <Text style={styles.badgeText}>
              {paid ? "Đã thanh toán" : "Chưa thanh toán"}
            </Text>
          </View>
          {paid ? (
            <Text style={styles.dateText}>
              Ngày thanh toán: {item.paidDate}
            </Text>
          ) : (
            <Text style={styles.dateText}>Hạn: {item.dueDate}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  listContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardUnpaid: {
    backgroundColor: "#fff5f5",
    borderLeftWidth: 4,
    borderLeftColor: "#e74c3c",
  },
  cardPaid: {
    backgroundColor: "#f5fff9",
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e88e5",
  },
  subInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  highlight: {
    color: "#333",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  badgeUnpaid: {
    backgroundColor: "#fdecea",
  },
  badgePaid: {
    backgroundColor: "#e8f5e9",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  dateText: {
    fontSize: 12,
    color: "#999",
  },
});

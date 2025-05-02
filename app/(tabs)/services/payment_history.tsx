import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // cần cài expo/vector-icons

const paidFees = [
  {
    id: 1,
    serviceName: "Phí quản lý",
    amount: 300000,
    paidDate: "2025-04-15",
    paymentMethod: "Chuyển khoản",
    note: "Đã thanh toán qua ngân hàng",
  },
  {
    id: 2,
    serviceName: "Phí gửi xe máy",
    amount: 100000,
    paidDate: "2025-04-12",
    paymentMethod: "MOMO",
    note: "",
  },
];

export default function ServicePaymentHistory() {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialIcons name="payment" size={20} color="red" />
        <Text style={styles.serviceName}>{item.serviceName}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="money-bill-wave" size={14} color="#555" />
        <Text style={styles.label}>Số tiền: </Text>
        <Text style={styles.amount}>{item.amount.toLocaleString()} VND</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="date-range" size={14} color="#555" />
        <Text style={styles.label}>Ngày thanh toán: </Text>
        <Text style={styles.value}>{item.paidDate}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="credit-card" size={14} color="#555" />
        <Text style={styles.label}>Phương thức: </Text>
        <Text style={styles.value}>{item.paymentMethod}</Text>
      </View>
      {item.note ? (
        <View style={styles.row}>
          <MaterialIcons name="notes" size={14} color="#555" />
          <Text style={styles.label}>Ghi chú: </Text>
          <Text style={styles.value}>{item.note}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Lịch sử thanh toán</Text>
      <FlatList
        data={paidFees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#007aff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    minWidth: 100,
  },
  value: {
    fontSize: 14,
    color: "#555",
    flexShrink: 1,
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#28a745",
  },
});

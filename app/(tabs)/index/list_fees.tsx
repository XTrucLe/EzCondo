import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const serviceFees = [
  {
    id: "1",
    name: "Phí rác thải",
    period: "Tháng 5/2025",
    amount: 50000,
    isPaid: false,
  },
  {
    id: "2",
    name: "Phí vệ sinh",
    period: "Tháng 5/2025",
    amount: 70000,
    isPaid: true,
  },
  {
    id: "3",
    name: "Phí an ninh",
    period: "Tháng 5/2025",
    amount: 80000,
    isPaid: false,
  },
];

export default function ServiceFeeListScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.period}>{item.period}</Text>
        <Text style={styles.amount}>{item.amount.toLocaleString()} đ</Text>
      </View>

      <View style={styles.actions}>
        {item.isPaid ? (
          <Text style={styles.paid}>Đã thanh toán</Text>
        ) : (
          <TouchableOpacity style={styles.payBtn}>
            <Text style={styles.payText}>Thanh toán</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách phí dịch vụ</Text>
      <FlatList
        data={serviceFees}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  period: {
    color: "#777",
    marginTop: 2,
  },
  amount: {
    marginTop: 4,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  actions: {
    marginLeft: 10,
  },
  payBtn: {
    backgroundColor: "#388e3c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  payText: {
    color: "#fff",
    fontWeight: "500",
  },
  paid: {
    color: "#4caf50",
    fontWeight: "600",
  },
});

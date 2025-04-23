import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function BillDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { bill } = route.params;

  const detailRows = [
    { label: "Mã hóa đơn:", value: bill.id },
    { label: "Căn hộ:", value: bill.room },
    { label: "Chủ hộ:", value: bill.owner },
    { label: "Dịch vụ:", value: bill.type },
    { label: "Tháng:", value: bill.month },
    { label: "Ngày tạo:", value: bill.createdDate },
    { label: "Ngày ghi chỉ số:", value: bill.readDate },
    { label: "Chỉ số đầu:", value: bill.startReading },
    { label: "Chỉ số cuối:", value: bill.endReading },
    { label: "Sử dụng:", value: `${bill.usage} kWh` },
    { label: "Số tiền:", value: `${bill.amount.toLocaleString()} đ` },
    {
      label: "Trạng thái:",
      value: bill.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán",
      valueStyle: { color: bill.status === "paid" ? "green" : "red" },
    },
    { label: "Hạn thanh toán:", value: bill.dueDate },
  ];

  const InfoRow = ({
    label,
    value,
    valueStyle = {},
  }: {
    label: string;
    value: string | number;
    valueStyle?: any;
  }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📄 Chi tiết Hóa đơn</Text>
        {detailRows.map((item, index) => (
          <InfoRow
            key={index}
            label={item.label}
            value={item.value}
            valueStyle={item.valueStyle}
          />
        ))}
        {bill.status === "unpaid" && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Thanh Toán Ngay</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafb",
    minHeight: "100%",
  },
  content: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
    color: "#1f2937",
  },
  row: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#374151",
    width: "50%",
  },
  value: {
    fontSize: 15,
    color: "#4b5563",
    width: "48%",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

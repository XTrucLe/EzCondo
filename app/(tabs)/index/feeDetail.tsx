import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { openBankApp } from "@/components/BankLinking";

// Types
type Bill = {
  id: string;
  room: string;
  owner: string;
  type: string;
  month: string;
  createdDate: string;
  readDate: string;
  startReading: number;
  endReading: number;
  usage: number;
  amount: number;
  status: "paid" | "unpaid";
  dueDate: string;
};

type InfoRowProps = {
  label: string;
  value: string | number;
  valueStyle?: object;
};

// Constants
const STATUS_CONFIG = {
  paid: {
    text: "Đã thanh toán",
    color: "#10B981", // green-500
    icon: "✅",
  },
  unpaid: {
    text: "Chưa thanh toán",
    color: "#EF4444", // red-500
    icon: "⚠️",
  },
};

// Components
const InfoRow = ({ label, value, valueStyle = {} }: InfoRowProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const PaymentButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Thanh Toán Ngay</Text>
  </TouchableOpacity>
);

// Main Component
export default function BillDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { bill } = route.params as { bill: Bill };

  const handlePayment = () => {
    // Xử lý thanh toán
    // navigation.navigate("Payment", { billId: bill.id });
  };

  const statusConfig = STATUS_CONFIG[bill.status];

  const detailRows = [
    { label: "Mã hóa đơn:", value: bill.id },
    { label: "Căn hộ:", value: bill.room },
    { label: "Chủ hộ:", value: bill.owner },
    { label: "Dịch vụ:", value: bill.type },
    { label: "Tháng:", value: bill.month },
    { label: "Ngày tạo:", value: bill.createdDate },
    { label: "Sử dụng:", value: `${bill.usage} kWh` },
    { label: "Số tiền:", value: `${bill.amount.toLocaleString()} đ` },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📄 Chi tiết Hóa đơn</Text>

        {detailRows.map((item, index) => (
          <InfoRow
            key={`${item.label}-${index}`}
            label={item.label}
            value={item.value}
          />
        ))}
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a365d",
    textAlign: "center",
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    color: "#4a5568",
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    flex: 1,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#4299e1",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: "#4299e1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  statusText: {
    marginLeft: 6,
    fontWeight: "600",
  },
});

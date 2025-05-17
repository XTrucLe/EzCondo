import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { PaymentHistoryType } from "@/utils/type/paymentType";
import useDateUtils from "@/hooks/useDateUtils";

type RouteParams = {
  params: {
    payment: PaymentHistoryType;
  };
};

const PaymentDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { formatDate } = useDateUtils();
  const payment = route.params?.payment;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Đã thanh toán";
      case "pending":
        return "Chờ xử lý";
      case "failed":
        return "Thất bại";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "failed":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const DetailRow = ({
    label,
    value,
    color,
  }: {
    label: string;
    value?: string;
    color?: string;
  }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={[styles.itemValue, color && { color }]}>{value || "-"}</Text>
    </View>
  );

  if (!payment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Không tìm thấy thông tin thanh toán.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.header}>Chi tiết thanh toán</Text>

          <DetailRow
            label="Mã giao dịch"
            value={
              payment.paymentId.slice(-5) ||
              `HĐ #${payment.paymentId.slice(-5)}`
            }
          />
          <DetailRow label="Ngày tạo" value={payment.createDate} />
          <DetailRow label="Căn hộ" value={payment.apartmentNumber} />
          <DetailRow label="Người thanh toán" value={payment.fullName} />
          <DetailRow label="Hình thức" value={"QR code"} />
          <DetailRow
            label="Trạng thái"
            value={getStatusLabel(payment.status)}
            color={getStatusColor(payment.status)}
          />
          <DetailRow label="Tổng tiền" value={formatCurrency(payment.amount)} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingTop: 20,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16, // Bo tròn hơn
    padding: 20,
    marginBottom: 20, // Thêm khoảng cách dưới card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, // Bóng mờ nhẹ giúp nổi bật
  },
  header: {
    fontSize: 24, // Tăng kích thước tiêu đề
    fontWeight: "700",
    color: "#333", // Màu đậm, dễ đọc
    marginBottom: 20,
    textAlign: "center",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#edecec",
    borderBottomWidth: 1,
  },
  itemLabel: {
    fontSize: 16,
    color: "#555", // Màu nhạt hơn cho label
    fontWeight: "500", // Độ đậm vừa phải
  },
  itemValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222", // Màu đậm hơn để dễ đọc
  },
  note: {
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#0056b3", // Màu xanh đậm cho nút quay lại
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "#dc3545",
    marginTop: 40,
  },
});

export default PaymentDetailScreen;

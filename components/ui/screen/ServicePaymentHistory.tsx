import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ModalCustome from "../custome/ModalCustome";
import { formatVND } from "./../../../hooks/useFormat";

const paidFees = [
  {
    id: 1,
    serviceName: "Phí quản lý",
    amount: 300000,
    paidDate: "2025-04-15",
    paymentMethod: "Chuyển khoản",
    note: "Đã thanh toán qua ngân hàng",
    status: "success",
  },
  {
    id: 2,
    serviceName: "Phí gửi xe máy",
    amount: 100000,
    paidDate: "2025-04-12",
    paymentMethod: "MOMO",
    note: "",
    status: "success",
  },
  {
    id: 3,
    serviceName: "Phí gửi ô tô",
    amount: 1500000,
    paidDate: "2025-04-10",
    paymentMethod: "VNPay",
    note: "Thanh toán qua ứng dụng di động",
    status: "success",
  },
  {
    id: 4,
    serviceName: "Phí vệ sinh",
    amount: 200000,
    paidDate: "2025-04-05",
    paymentMethod: "Tiền mặt",
    note: "Nộp tại văn phòng quản lý",
    status: "success",
  },
  {
    id: 5,
    serviceName: "Phí bảo trì thang máy",
    amount: 450000,
    paidDate: "2025-03-28",
    paymentMethod: "Chuyển khoản",
    note: "Thanh toán định kỳ hàng quý",
    status: "success",
  },
  {
    id: 6,
    serviceName: "Phí internet",
    amount: 250000,
    paidDate: "2025-04-18",
    paymentMethod: "ZaloPay",
    note: "",
    status: "success",
  },
];

export default function ServicePaymentHistory() {
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleModalOpen = (item: any) => {
    setVisible(true);
    setSelectedItem(item);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleModalOpen(item)}
      activeOpacity={0.8}
    >
      {/* Header: Tên dịch vụ & Trạng thái */}
      <View style={styles.headerRow}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        {item.status === "success" && (
          <View style={styles.statusBadge}>
            <MaterialIcons name="check-circle" size={16} color="#2ecc71" />
            <Text style={styles.statusText}>Thành công</Text>
          </View>
        )}
      </View>

      {/* Số tiền lớn & nổi bật */}
      <Text style={styles.amount}>{formatVND(item.amount)}</Text>

      {/* Thông tin chi tiết */}
      <View style={styles.infoBlock}>
        <View style={styles.infoRow}>
          <MaterialIcons name="calendar-today" size={16} color="#555" />
          <Text style={styles.infoText}>{item.paidDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="credit-card" size={16} color="#555" />
          <Text style={styles.infoText}>{item.paymentMethod}</Text>
        </View>
        {item.note ? (
          <View style={styles.infoRow}>
            <MaterialIcons name="note" size={16} color="#555" />
            <Text style={styles.infoText}>{item.note}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paidFees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <ModalCustome
        visible={visible}
        setVisible={setVisible}
        data={selectedItem || undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  serviceName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eafaf1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    color: "#2ecc71",
    marginLeft: 4,
    fontWeight: "500",
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007aff",
    marginBottom: 12,
  },

  infoBlock: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  infoText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 6,
  },
});

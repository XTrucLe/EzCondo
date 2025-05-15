import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { getPaymentHistory, getPaymentNeed } from "@/services/paymentService";

// Sample clean payment data
const paymentHistory = [
  {
    id: 1,
    fullname: "Nguyễn Văn A",
    apartmentNumber: "B2-101",
    type: "service",
    amount: 500000,
    method: "MOMO",
    status: "failed",
    transactionId: "TX12345",
    createDate: "2025-05-05",
    serviceName: "Dịch vụ vệ sinh",
    serviceStartDate: "2025-05-01",
    serviceEndDate: "2025-05-31",
    servicePrice: 500000,
  },
  {
    id: 2,
    fullname: "Nguyễn Văn B",
    apartmentNumber: "C3-202",
    type: "electric",
    amount: 350000,
    method: "Tiền mặt",
    status: "success",
    transactionId: "TX12346",
    createDate: "2025-04-25",
    readingDate: "2025-04-20",
    totalComsumption: 120,
    meterNumber: "EM9876",
  },
  {
    id: 3,
    fullname: "Trần Thị C",
    apartmentNumber: "A1-305",
    type: "service",
    amount: 200000,
    method: "Chuyển khoản",
    status: "success",
    transactionId: "TX12347",
    createDate: "2025-05-02",
    serviceName: "Gửi xe máy",
    serviceStartDate: "2025-05-01",
    serviceEndDate: "2025-05-31",
    servicePrice: 200000,
  },
  {
    id: 4,
    fullname: "Phạm Văn D",
    apartmentNumber: "D4-409",
    type: "electric",
    amount: 420000,
    method: "MOMO",
    status: "pending",
    transactionId: "TX12348",
    createDate: "2025-04-30",
    readingDate: "2025-04-25",
    totalComsumption: 150,
    meterNumber: "EM1234",
  },
  {
    id: 5,
    fullname: "Lê Thị E",
    apartmentNumber: "E5-510",
    type: "service",
    amount: 800000,
    method: "Tiền mặt",
    status: "success",
    transactionId: "TX12349",
    createDate: "2025-05-04",
    serviceName: "Bảo trì thang máy",
    serviceStartDate: "2025-05-01",
    serviceEndDate: "2025-05-31",
    servicePrice: 800000,
  },
  {
    id: 6,
    fullname: "Đỗ Văn F",
    apartmentNumber: "F6-611",
    type: "electric",
    amount: 270000,
    method: "Chuyển khoản",
    status: "failed",
    transactionId: "TX12350",
    createDate: "2025-04-22",
    readingDate: "2025-04-18",
    totalComsumption: 90,
    meterNumber: "EM5678",
  },
];

const PaymentHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(paymentHistory);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const lowerText = text.toLowerCase();
    const filtered = paymentHistory.filter((item) =>
      `${item.transactionId || item.id}`.toLowerCase().includes(lowerText)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetch = async () => {
      // Simulate fetching data from an API
      const response = await getPaymentNeed();
      console.log(response);

      const response1 = await getPaymentHistory();
      console.log("Payment history: ", response1);
    };
    fetch();
  }, []);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
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

  const renderPaymentItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("payment_detail", { payment: item })}
    >
      <View style={styles.left}>
        <Text style={styles.title}>
          {item.transactionId || `HĐ #${item.id}`} - {item.type.toUpperCase()}
        </Text>
        <Text style={styles.subText}>{item.createDate}</Text>
        <Text style={styles.subText}>
          {item.apartmentNumber} • {item.fullname}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status === "success"
            ? "Đã thanh toán"
            : item.status === "pending"
            ? "Chờ xử lý"
            : "Thất bại"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Tìm theo mã giao dịch..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderPaymentItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc", padding: 10 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  left: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  subText: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  status: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
  },
});

export default PaymentHistoryScreen;

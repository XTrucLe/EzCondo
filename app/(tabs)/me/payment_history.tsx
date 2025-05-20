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
import { getPaymentHistory } from "@/services/paymentService";
import { PaymentHistoryType } from "@/utils/type/paymentType";
import useDateUtils from "@/hooks/useDateUtils";

const PaymentHistoryScreen = () => {
  const { formatDate } = useDateUtils();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryType[]>(
    []
  );
  const [filteredData, setFilteredData] = useState(paymentHistory);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await getPaymentHistory();
        setPaymentHistory(response);
        setFilteredData(response);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPaymentHistory();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const lowerText = text.toLowerCase();
    const filtered = paymentHistory.filter(
      (item) =>
        item.paymentId?.toLowerCase().includes(lowerText) ||
        item.fullName?.toLowerCase().includes(lowerText) ||
        item.apartmentNumber?.toLowerCase().includes(lowerText) ||
        item.type?.toLowerCase().includes(lowerText)
    );
    setFilteredData(filtered);
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

  const renderPaymentItem = ({ item }: { item: PaymentHistoryType }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("payment_detail", { payment: item })}
    >
      <View style={styles.left}>
        <Text style={styles.title}>
          {item.paymentId.slice(-5) || `HĐ #${item.paymentId.slice(-5)}`} -{" "}
          {item.type.toUpperCase()}
        </Text>
        <Text style={styles.subText}>
          {formatDate(new Date(item.createDate))}
        </Text>
        <Text style={styles.subText}>
          {item.apartmentNumber} • {item.fullName}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
        keyExtractor={(item) => `${item.paymentId}`}
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

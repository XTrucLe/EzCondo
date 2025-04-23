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

  return (
    <View style={styles.container}>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              item.status === "unpaid" ? styles.unpaidCard : styles.paidCard,
            ]}
            onPress={() => navigation.navigate("feeDetail", { bill: item })}
          >
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <Ionicons
                  name={item.type.includes("nước") ? "water" : "flash"}
                  size={24}
                  color="#4A90E2"
                />
                <Text style={styles.titleText}>
                  {"  "}
                  {item.type} – {item.month}
                </Text>
              </View>
              <Text style={styles.amountText}>
                {item.amount.toLocaleString()}đ
              </Text>
            </View>

            <Text style={styles.infoText}>
              Phòng: {item.room} – Chủ hộ: {item.owner}
            </Text>

            <Text
              style={[
                styles.statusText,
                item.status === "unpaid"
                  ? styles.statusUnpaid
                  : styles.statusPaid,
              ]}
            >
              Trạng thái:{" "}
              {item.status === "unpaid"
                ? "❌ Chưa thanh toán"
                : "✅ Đã thanh toán"}
            </Text>

            {item.status === "unpaid" && (
              <Text style={styles.dueDateText}>
                Hạn thanh toán: {item.dueDate}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  unpaidCard: {
    backgroundColor: "#fff3f3",
    borderColor: "#ffcccc",
    borderWidth: 1,
  },
  paidCard: {
    backgroundColor: "#e8f5e9",
    borderColor: "#c8e6c9",
    borderWidth: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E88E5",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  statusUnpaid: {
    color: "#E53935",
  },
  statusPaid: {
    color: "#43A047",
  },
  dueDateText: {
    fontSize: 13,
    color: "#999",
  },
});

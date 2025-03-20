import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";

export default function Booking() {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Vé bơi
  const [ticketType, setTicketType] = useState<"daily" | "monthly">("daily");
  const [childTickets, setChildTickets] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);
  const [months, setMonths] = useState(1); // Số tháng đăng ký

  const availableTimes = [
    "06:00 - 07:00",
    "07:30 - 08:30",
    "16:00 - 17:00",
    "18:30 - 19:30",
  ];

  const handleBooking = () => {
    if (!name || !phone || !selectedTime) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    let ticketDetails =
      ticketType === "monthly"
        ? `Vé tháng: ${months} tháng`
        : `Người lớn: ${adultTickets}, Trẻ em: ${childTickets}`;

    Alert.alert(
      "✅ Đặt lịch thành công!",
      `Tên: ${name}\nSố điện thoại: ${phone}\nNgày: ${date.toDateString()}\nGiờ: ${selectedTime}\nVé: ${ticketDetails}`
    );
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 Đặt lịch bơi lội</Text>

      {/* Chọn ngày */}
      <Text style={styles.label}>Chọn ngày:</Text>
      <TouchableOpacity style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {/* Chọn giờ */}
      <Text style={styles.label}>Chọn khung giờ:</Text>
      <View style={styles.timeContainer}>
        {availableTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTime,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={
                selectedTime === time
                  ? styles.selectedTimeText
                  : styles.timeText
              }
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Loại vé */}
      <Text style={styles.label}>Chọn loại vé:</Text>
      <View style={styles.ticketContainer}>
        <TouchableOpacity
          style={[
            styles.ticketButton,
            ticketType === "daily" && styles.selectedTicket,
          ]}
          onPress={() => setTicketType("daily")}
        >
          <Text
            style={
              ticketType === "daily" ? styles.selectedText : styles.ticketText
            }
          >
            Vé ngày
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ticketButton,
            ticketType === "monthly" && styles.selectedTicket,
          ]}
          onPress={() => {
            setTicketType("monthly");
            setChildTickets(0);
            setAdultTickets(0);
          }}
        >
          <Text
            style={
              ticketType === "monthly" ? styles.selectedText : styles.ticketText
            }
          >
            Vé tháng
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chọn số lượng vé */}
      {ticketType === "daily" ? (
        <View style={styles.rowContainer}>
          {/* Vé trẻ em */}
          <View style={styles.column}>
            <Text style={styles.label}>Trẻ em</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setChildTickets(Math.max(0, childTickets - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{childTickets}</Text>
              <TouchableOpacity
                onPress={() => setChildTickets(childTickets + 1)}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Vé người lớn */}
          <View style={styles.column}>
            <Text style={styles.label}>Người lớn</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setAdultTickets(Math.max(0, adultTickets - 1))}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{adultTickets}</Text>
              <TouchableOpacity
                onPress={() => setAdultTickets(adultTickets + 1)}
                style={styles.counterButton}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Số tháng:</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={() => setMonths(Math.max(1, months - 1))}
              style={styles.counterButton}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{months}</Text>
            <TouchableOpacity
              onPress={() => setMonths(months + 1)}
              style={styles.counterButton}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Thông tin khách hàng */}
      <Text style={styles.label}>Họ và tên:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Nút Đặt lịch */}
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Xác nhận đặt lịch</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007AFF",
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "500", color: "#333", marginBottom: 5 },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: { flex: 1, alignItems: "center" },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  counterButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
  counterText: { color: "white", fontSize: 18, fontWeight: "bold" },
  counterValue: { fontSize: 18, fontWeight: "bold", marginHorizontal: 10 },
  ticketContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  ticketButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ddd",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedTicket: { backgroundColor: "#007AFF" },
  selectedText: { color: "white", fontWeight: "bold" },
  ticketText: { fontSize: 16 },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, color: "white", fontWeight: "bold" },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 15,
  },
  dateText: { fontSize: 16 },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  timeSlot: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ddd",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedTime: { backgroundColor: "#007AFF" },
  timeText: { fontSize: 16 },
  selectedTimeText: { color: "white", fontWeight: "bold" },
});

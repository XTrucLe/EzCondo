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

  // State lưu thông tin đặt chỗ
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Danh sách khung giờ có sẵn
  const availableTimes = [
    "06:00 - 07:00",
    "07:30 - 08:30",
    "16:00 - 17:00",
    "18:30 - 19:30",
  ];

  // Xử lý khi chọn ngày
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Xử lý khi nhấn nút "Đặt lịch"
  const handleBooking = () => {
    if (!name || !phone || !selectedTime) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    Alert.alert(
      "✅ Đặt lịch thành công!",
      `Tên: ${name}\nSố điện thoại: ${phone}\nNgày: ${date.toDateString()}\nGiờ: ${selectedTime}`
    );
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 Đặt lịch bơi lội</Text>

      {/* Chọn ngày */}
      <Text style={styles.label}>Chọn ngày:</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
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

      {/* Nhập thông tin khách hàng */}
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
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007AFF",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  dateButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: "#007AFF",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedTime: {
    backgroundColor: "#007AFF",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  selectedTimeText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

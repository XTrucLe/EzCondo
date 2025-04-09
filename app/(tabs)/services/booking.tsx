import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigation } from "expo-router";

const BookingScreen = () => {
  const { translation } = useLanguage();
  const navigation = useNavigation<any>();
  // Lấy giá tháng và năm từ route params
  const { monthPrice, yearPrice } = useRoute().params as {
    monthPrice: number;
    yearPrice: number;
  };

  const [selectedPackage, setSelectedPackage] = useState("month"); // Gói tháng/năm
  const [numMonths, setNumMonths] = useState("1"); // Số tháng
  const [startDate, setStartDate] = useState(new Date()); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(new Date()); // Ngày kết thúc
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle lịch
  const animation = new Animated.Value(0);
  const [totalPrice, setTotalPrice] = useState(0); // Lưu giá trị tổng

  useEffect(() => {
    console.log(monthPrice, yearPrice);

    let newEndDate = new Date(startDate);
    if (selectedPackage === "month") {
      newEndDate.setMonth(newEndDate.getMonth() + Number(numMonths || 1));
    } else {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    }
    setEndDate(newEndDate);

    // Cập nhật giá trị tổng
    calculateTotalPrice();
    startAnimation(); // Hiệu ứng khi ngày thay đổi
  }, [startDate, numMonths, selectedPackage]);

  const handleMonthsChange = (value: string) => {
    if (value === "") {
      setNumMonths(""); // Cho phép nhập rỗng
      return;
    }
    let months = parseInt(value.trim(), 10);

    if (isNaN(months) || months < 1) {
      months = 1;
    } else if (months > 12) {
      months = 12;
    }

    setNumMonths(months.toString());

    // Nếu chọn 12 tháng, chuyển sang gói năm
    if (months === 12) {
      setSelectedPackage("year");
    }
  };

  const calculateTotalPrice = () => {
    if (selectedPackage === "month") {
      setTotalPrice(monthPrice * Number(numMonths || 1));
    } else {
      setTotalPrice(yearPrice);
    }
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBookNow = () => {
    navigation.navigate("booking.confirm", {
      startDate: startDate.toLocaleDateString("vi-VN"),
      endDate: endDate.toLocaleDateString("vi-VN"),
      numMonths: selectedPackage === "month" ? numMonths : "1",
      totalPrice,
      selectedPackage,
    });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>📅 Đặt Lịch Dịch Vụ</Text>

      {/* Chọn Ngày Bắt Đầu */}
      <Text style={styles.label}>Ngày bắt đầu:</Text>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar-outline" size={20} color="#007AFF" />
        <Text style={styles.dateText}>
          {startDate.toLocaleDateString("vi-VN")}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {/* Chọn Gói Dịch Vụ */}
      <Text style={styles.label}>Chọn gói:</Text>
      <View style={styles.packageContainer}>
        <TouchableOpacity
          style={[
            styles.packageButton,
            selectedPackage === "month" && styles.selectedPackage,
          ]}
          onPress={() => setSelectedPackage("month")}
        >
          <Text style={styles.packageText}>Gói Tháng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.packageButton,
            selectedPackage === "year" && styles.selectedPackage,
          ]}
          onPress={() => setSelectedPackage("year")}
        >
          <Text style={styles.packageText}>Gói Năm</Text>
        </TouchableOpacity>
      </View>

      {/* Input số tháng */}
      {selectedPackage === "month" && (
        <>
          <Text style={styles.label}>Số tháng:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numMonths}
            onChangeText={handleMonthsChange}
            placeholder="Nhập số tháng (1 - 12)"
            maxLength={2}
          />
        </>
      )}

      {/* Hiển thị giá trị tổng */}
      <Text style={styles.label}>Tổng giá:</Text>
      <Text style={styles.totalPrice}>₫ {totalPrice.toLocaleString()}</Text>

      {/* Ngày kết thúc */}
      <Text style={styles.label}>📆 Ngày kết thúc:</Text>
      <Animated.View
        style={[
          styles.endDateContainer,
          {
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }),
              },
            ],
          },
        ]}
      >
        <Ionicons name="calendar" size={20} color="#007AFF" />
        <Text style={styles.dateText}>
          {endDate.toLocaleDateString("vi-VN")}
        </Text>
      </Animated.View>

      {/* Nút đặt lịch */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>{translation.bookNow}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 18, fontWeight: "600", marginTop: 15 },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateText: { marginLeft: 10, fontSize: 16 },
  packageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  packageButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  selectedPackage: { backgroundColor: "#007AFF" },
  packageText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
  },
  endDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  bookButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  bookButtonText: { fontSize: 18, color: "white", fontWeight: "bold" },
});

export default BookingScreen;

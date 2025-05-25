import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";

const BookingScreen = () => {
  const { translation } = useLanguage();
  const navigation = useNavigation<any>();
  const { monthPrice, yearPrice } = useRoute().params as {
    monthPrice: number;
    yearPrice: number;
  };

  const [selectedPackage, setSelectedPackage] = useState<"month" | "year">(
    "month"
  );
  const [numMonths, setNumMonths] = useState("1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const updatedEnd = new Date(startDate);
    if (selectedPackage === "month") {
      updatedEnd.setMonth(updatedEnd.getMonth() + Number(numMonths || 1));
    } else {
      updatedEnd.setFullYear(updatedEnd.getFullYear() + 1);
    }
    setEndDate(updatedEnd);
    calculateTotalPrice();
    animateEndDate();
  }, [startDate, numMonths, selectedPackage]);

  const calculateTotalPrice = () => {
    const price =
      selectedPackage === "month"
        ? monthPrice * Number(numMonths || 1)
        : yearPrice;
    setTotalPrice(price);
  };

  const animateEndDate = () => {
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

  const handleMonthsChange = (value: string) => {
    if (value === "") return setNumMonths("");
    let months = Math.min(Math.max(parseInt(value.trim(), 10) || 1, 1), 12);
    setNumMonths(months.toString());
    if (months === 12) setSelectedPackage("year");
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
      <Text style={styles.header}>📅 Đặt Lịch Dịch Vụ</Text>

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
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Chọn gói:</Text>
      <View style={styles.packageContainer}>
        {["month", "year"].map((pkg) => (
          <TouchableOpacity
            key={pkg}
            style={[
              styles.packageButton,
              selectedPackage === pkg && styles.selectedPackage,
            ]}
            onPress={() => setSelectedPackage(pkg as "month" | "year")}
          >
            <Text style={styles.packageText}>
              {pkg === "month" ? "Gói Tháng" : "Gói Năm"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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

      <Text style={styles.label}>Tổng giá:</Text>
      <Text style={styles.totalPrice}>₫ {totalPrice.toLocaleString()}</Text>

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

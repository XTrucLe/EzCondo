import { Service } from "@/components/ui/ServiceCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("vi-VN", options);
};
const addMonthsKeepingDay = (date: Date, monthsToAdd: number): Date => {
  const day = date.getDate();
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + monthsToAdd);

  console.log(newDate);

  // If new month has fewer days (e.g., 31 → April), set to last day of the previous month
  if (newDate.getDate() < day) {
    newDate.setDate(0);
  } else {
    newDate.setDate(day);
  }
  return newDate;
};

const ServiceSubscriptionScreen = () => {
  const { service } = useRoute().params as { service: Service };
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [regisService, setRegisService] = useState({
    ...service,
    registerDate: formatDate(new Date(Date.now())),
    expireDate: formatDate(
      new Date(Date.now() + selectedDuration * 30 * 24 * 60 * 60 * 1000)
    ),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const durations = [
    { label: "1 tháng", value: 1 },
    { label: "3 tháng", value: 3 },
    { label: "6 tháng", value: 6 },
    { label: "12 tháng", value: 12 },
  ];

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    const newRegisterDate = currentDate.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setRegisService((prev) => ({
      ...prev,
      registerDate: newRegisterDate,
    }));
  };

  const handleChangeDuration = (value: number) => {
    setSelectedDuration(value);
    const newExpireDate = addMonthsKeepingDay(
      new Date(regisService.registerDate || new Date()),
      value
    ).toLocaleDateString("vi-VN");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng ký / Gia hạn dịch vụ</Text>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Tên dịch vụ:</Text>
          <Text style={styles.text}>{service.name}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Phí dịch vụ:</Text>
          <Text style={styles.text}>{service.price}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Ngày bắt đầu:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.text}>
              {(regisService.registerDate || new Date()).toLocaleString(
                "vi-VN"
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Hết hạn hiện tại:</Text>
          <Text style={styles.text}>{regisService.expireDate}</Text>
        </View>

        <Text style={styles.label}>Chọn thời hạn:</Text>
        <View style={styles.options}>
          {durations.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.option,
                selectedDuration === item.value && styles.selectedOption,
              ]}
              onPress={() => handleChangeDuration(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedDuration === item.value && styles.selectedOptionText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.totalBlock}>
          <Text style={styles.label}>Tổng phí:</Text>
          <Text style={styles.totalText}>
            {regisService.price.toLocaleString("vi-VN")}đ
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký / Gia hạn</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(regisService.registerDate || new Date())}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date(Date.now())}
          maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
        />
      )}
    </View>
  );
};

export default ServiceSubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  text: {
    color: "#333",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedOption: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  optionText: {
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "600",
  },
  totalBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 24,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

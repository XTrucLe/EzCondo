import { Service } from "@/components/ui/ServiceCard";
import useDateUtils from "@/hooks/useDateUtils";
import { useLanguage } from "@/hooks/useLanguage";
import { useLoading } from "@/hooks/useLoading";
import { createBooking } from "@/services/bookingService";
import { paymentService } from "@/services/paymentService";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const InfoRow = ({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress?: () => void;
}) => (
  <View style={styles.infoBlock}>
    <Text style={styles.label}>{label}</Text>
    {onPress ? (
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Ionicons name="pencil" size={20} color="#007BFF" />
        <Text style={[styles.text, styles.clickableText]} numberOfLines={1}>
          {value}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text
        style={[styles.text, { maxWidth: "70%" }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    )}
  </View>
);

const ServiceSubscriptionScreen = () => {
  const { startLoading, stopLoading } = useLoading();
  const { translation } = useLanguage();
  const navigation = useNavigation<any>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { service } = useRoute().params as { service: Service };
  const [selectedDuration, setSelectedDuration] = useState(1);
  const selectedPlan = "month"; // or "year", depending on your logic
  const { formatDate, addMonths } = useDateUtils();

  const [regisService, setRegisService] = useState({
    ...service,
    registerDate: new Date(),
    expireDate: addMonths(new Date(), 1),
    price: service.priceOfMonth,
  });

  const durations = [
    { label: "1", value: 1 },
    { label: "3", value: 3 },
    { label: "6", value: 6 },
    { label: "12", value: 12 },
  ];

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);

    // Tính giá dựa trên số tháng chọn
    const price =
      selectedDuration === 12
        ? service.priceOfYear // Nếu chọn 12 tháng, tính theo giá năm
        : selectedDuration * service.priceOfMonth; // Nếu chọn các tháng còn lại, nhân với giá tháng

    setRegisService((prev) => ({
      ...prev,
      registerDate: currentDate,
      expireDate: addMonths(currentDate, selectedDuration),
      price: price, // Cập nhật giá
    }));
  };

  const handleChangeDuration = (value: number) => {
    setSelectedDuration(value);

    // Tính giá tương tự như trên
    const price =
      value === 12
        ? service.priceOfYear // Nếu chọn 12 tháng, tính theo giá năm
        : value * service.priceOfMonth; // Nếu chọn các tháng còn lại, nhân với giá tháng

    setRegisService((prev) => ({
      ...prev,
      price: price,
      expireDate: addMonths(prev.registerDate, value),
    }));
  };

  const handleRegis = async () => {
    const newBookingData = {
      serviceId: regisService.id,
      startDate: regisService.registerDate,
      forMonthOrYear: selectedPlan,
      totalMonth: selectedDuration,
    };

    try {
      startLoading();
      const bookingId = await createBooking(newBookingData);
      if (!bookingId) throw new Error("Không tạo được booking");

      const { data } = await paymentService.createPayment(bookingId);
      if (!data) throw new Error("Không tạo được payment");

      navigation.navigate("QRcode", { data });
    } catch (error) {
      console.error("Lỗi:", error);
      Alert.alert(translation.error, translation.error);
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng ký dịch vụ</Text>

        <View style={styles.infoSection}>
          <InfoRow label="Tên dịch vụ:" value={service.serviceName} />
          <InfoRow
            label="Phí theo tháng:"
            value={`${service.priceOfMonth.toLocaleString("vi-VN")}đ`}
          />
          <InfoRow
            label="Phí theo năm:"
            value={`${service.priceOfYear.toLocaleString("vi-VN")}đ`}
          />
          <InfoRow
            label="Ngày bắt đầu:"
            value={formatDate(regisService.registerDate)}
            onPress={() => setShowDatePicker(true)}
          />
          <InfoRow
            label="Ngày hết hạn:"
            value={formatDate(regisService.expireDate)}
          />
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
                {item.label} {"tháng"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.totalBlock}>
          <Text style={styles.label}>Tổng phí:</Text>
          <Text style={styles.totalText}>
            {(regisService.price || 0).toLocaleString("vi-VN")}đ
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegis}>
          <Text style={styles.buttonText}>Đăng ký / Gia hạn</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={regisService.registerDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default ServiceSubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6F8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    position: "relative",
    minWidth: 130,
    maxWidth: "70%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // thêm chút nền nếu muốn
    borderRadius: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    color: "#555",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#222",
    maxWidth: "100%",
  },
  clickableText: {
    color: "#007BFF",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E6E6E6",
    borderRadius: 12,
  },
  selectedOption: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "600",
  },
  totalBlock: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007BFF",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

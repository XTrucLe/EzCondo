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
        <Text style={[styles.text, styles.clickableText]}>{value}</Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.text}>{value}</Text>
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
  const { formatDate, addMonths } = useDateUtils();
  const [regisService, setRegisService] = useState({
    ...service,
    registerDate: new Date(Date.now()),
    expireDate: addMonths(new Date(Date.now()), 1),
  });

  const durations = [
    { label: "1 tháng", value: 1 },
    { label: "3 tháng", value: 3 },
    { label: "6 tháng", value: 6 },
    { label: "12 tháng", value: 12 },
  ];

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setRegisService((prev) => ({
      ...prev,
      registerDate: currentDate,
      expireDate: addMonths(currentDate, selectedDuration),
    }));
  };

  const handleChangeDuration = (value: number) => {
    setSelectedDuration(value);

    const newExpireDate = addMonths(regisService.registerDate, value);
    setRegisService((prev) => ({
      ...prev,
      price: service.price * value,
      expireDate: newExpireDate,
    }));
  };

  const handleRegis = async () => {
    const newBookingData = {
      serviceId: regisService.id,
      startDate: regisService.registerDate,
      forMonthOrYear: "month",
      totalMonth: selectedDuration,
    };
    console.log(newBookingData);

    try {
      startLoading();
      // Bước 1: Gọi API tạo booking
      const bookingId = await createBooking(newBookingData);
      console.log("Booking ID:", bookingId);

      if (!bookingId) {
        throw new Error("Không tạo được booking!");
      }

      // Bước 2: Gọi API tạo payment, sau khi booking thành công
      const { data } = await paymentService.createPayment(bookingId);

      if (!data) {
        throw new Error("Không tạo được payment!");
      }
      // let data = {
      //   accountNumber: "1234567890",
      //   accountOwner: "Nguyen Van A",
      //   amount: "1,000,000 VND",
      //   description: "Thanh toán phí dịch vụ tháng 4",
      //   qrCode: "https://example.com/qrcode1.png",
      // };
      // Bước 3: Khi tất cả thành công, mới navigate
      navigation.navigate("QRcode", { data });
    } catch (error) {
      console.error("Lỗi khi đặt chỗ hoặc thanh toán:", error);
      // Bạn có thể show Alert hoặc Toast ở đây
      Alert.alert(translation.error, translation.error);
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng ký / Gia hạn dịch vụ</Text>

        <View style={styles.infoSection}>
          <InfoRow label="Tên dịch vụ:" value={service.name} />
          <InfoRow
            label="Phí dịch vụ:"
            value={`${service.price.toLocaleString("vi-VN")}đ`}
          />
          <InfoRow
            label="Ngày bắt đầu:"
            value={formatDate(regisService.registerDate)}
            onPress={() => setShowDatePicker(true)}
          />
          <InfoRow
            label="Hết hạn hiện tại:"
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
                {item.label}
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
          maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
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
    flexDirection: "row-reverse",
    alignItems: "center", // căn giữa icon và text
    paddingVertical: 5,
    paddingHorizontal: 10,
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

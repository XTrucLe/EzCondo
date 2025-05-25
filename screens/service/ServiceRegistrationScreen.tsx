import useDateUtils from "@/hooks/useDateUtils";
import { formatVND } from "@/hooks/useFormat";
import { useLanguage } from "@/hooks/useLanguage";
import { useLoading } from "@/hooks/useLoading";
import { useSubscription } from "@/hooks/useSubscription";
import { useAppNavigator } from "@/navigation/useAppNavigate";
import { createBooking } from "@/services/bookingService";
import { paymentService } from "@/services/paymentService";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";

const ServiceSubscriptionScreen = () => {
  const { startLoading, stopLoading } = useLoading();
  const { translation } = useLanguage();
  const { formatDate, addMonths } = useDateUtils();
  const { navigate } = useAppNavigator();

  const { serviceInfo } = useRoute().params as {
    serviceInfo: ServiceDetailType;
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    durationOptions,
    selectedDuration,
    subscriptionData,
    handleDateChange,
    handleDurationChange,
    getBookingPayload,
  } = useSubscription(serviceInfo);
  console.log("money", subscriptionData.price);

  const handleSubscription = async () => {
    const bookingPayload = getBookingPayload();

    try {
      startLoading();
      const bookingId = await createBooking(bookingPayload);
      if (!bookingId) throw new Error("Tạo đơn đăng ký thất bại");

      const data = await paymentService.createPayment(bookingId);
      if (!data) throw new Error("Tạo thông tin thanh toán thất bại");

      navigate("Payment", { screen: "QRCode", params: { serviceData: data } });
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      Alert.alert(translation.error, translation.error);
    } finally {
      stopLoading();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerInfoContainer}>
          {serviceInfo?.images && (
            <Image
              source={{ uri: serviceInfo?.images[0].imgPath }}
              style={styles.serviceImage}
            />
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{serviceInfo.serviceName}</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {serviceInfo.description}
            </Text>
          </View>
        </View>

        {/* Pricing Cards */}
        <View style={styles.pricingCard}>
          <View style={styles.pricingOptions}>
            <View
              style={[styles.option, !serviceInfo?.priceOfYear && { flex: 1 }]}
            >
              <Text style={styles.optionLabel}>Gói Tháng</Text>
              <Text style={styles.optionPrice}>
                {formatVND(serviceInfo.priceOfMonth)}
              </Text>
            </View>

            {serviceInfo?.priceOfYear ? (
              <>
                <View style={styles.optionDivider} />
                <View style={styles.option}>
                  <Text style={styles.optionLabel}>Gói Năm</Text>
                  <Text style={styles.optionPrice}>
                    {formatVND(serviceInfo.priceOfYear)}
                  </Text>
                  <Text style={styles.optionNote}>
                    Tiết kiệm{" "}
                    {(
                      (1 -
                        serviceInfo.priceOfYear /
                          (serviceInfo.priceOfMonth * 12)) *
                      100
                    ).toFixed(2)}
                    %
                  </Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>

      {/* Date Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thời gian sử dụng</Text>

        <View style={styles.dateRow}>
          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>Ngày bắt đầu</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateValue}>
                {formatDate(subscriptionData.registerDate)}
              </Text>
              <Ionicons name="calendar" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>Ngày hết hạn</Text>
            <View style={styles.dateButton}>
              <Text style={styles.dateValue}>
                {formatDate(subscriptionData.expireDate)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Duration Selection */}
      <View style={styles.durationSection}>
        <Text style={styles.sectionHeader}>CHỌN THỜI HẠN SỬ DỤNG</Text>
        <View style={styles.durationGrid}>
          {durationOptions.map((duration) => {
            const isActive = selectedDuration === duration;

            return (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationCard,
                  isActive && styles.activeDurationCard,
                ]}
                onPress={() => handleDurationChange(duration)}
              >
                <View style={styles.durationContent}>
                  <Text
                    style={[
                      styles.durationNumber,
                      isActive && styles.activeDurationNumber,
                    ]}
                  >
                    {duration}
                  </Text>
                  <Text
                    style={[
                      styles.durationUnit,
                      isActive && styles.activeDurationUnit,
                    ]}
                  >
                    Tháng
                  </Text>
                </View>

                {isActive && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Total and Payment */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng thanh toán:</Text>
          <Text style={styles.summaryValue}>
            {formatVND(subscriptionData.price)}
          </Text>
        </View>
        <Text style={styles.summaryNote}>
          ({selectedDuration} tháng x {formatVND(serviceInfo.priceOfMonth)}
          /tháng)
        </Text>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handleSubscription}
        >
          <Text style={styles.paymentButtonText}>XÁC NHẬN THANH TOÁN</Text>
          <Ionicons name="wallet" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={subscriptionData.registerDate}
          mode="date"
          minimumDate={new Date()}
          onChange={(event, date) => {
            if (event.type === "set" && date) {
              handleDateChange(date);
            }
            setShowDatePicker(false);
          }}
        />
      )}
    </ScrollView>
  );
};
export default ServiceSubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
  },
  serviceImage: {
    height: 80,
    width: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#2d3436",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: "#636e72",
    lineHeight: 20,
  },
  serviceBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  ratingText: {
    fontSize: 13,
    color: "#636e72",
    marginLeft: 6,
  },
  pricingCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },

  pricingOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  option: {
    flex: 1,
    alignItems: "center",
  },

  optionDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 8,
  },

  optionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },

  optionPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E88E5",
    marginTop: 4,
  },

  optionSubtext: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  optionNote: {
    fontSize: 11,
    color: "#43A047",
    marginTop: 4,
  },

  section: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    left: -12,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    width: "48%",
  },
  dateLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    transitionDuration: "200ms",
  },
  dateValue: {
    fontSize: 16,
    color: "#333",
  },
  durationSection: {
    marginTop: 20,
  },

  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },

  durationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  durationContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  durationCard: {
    width: "30%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  activeDurationCard: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },

  durationNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  activeDurationNumber: {
    color: "#007AFF",
  },

  durationUnit: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  activeDurationUnit: {
    color: "#007AFF",
  },

  selectedBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 2,
  },

  summaryCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#555",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
  },
  summaryNote: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  paymentButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 18,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalClose: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  modalCloseText: {
    color: "white",
    fontSize: 16,
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#fff",
  },
});

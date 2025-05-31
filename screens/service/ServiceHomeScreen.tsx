import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SlideShow } from "@/components/ui/SlideShow";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "react-native-paper";
import { useNavigation } from "expo-router";
import { getServiceDetail, getServiceImages } from "@/services/servicesService";
import { checkHadBooking, getMyBooking } from "@/services/bookingService";
import { useLoading } from "@/hooks/useLoading";
import { formatVND } from "@/hooks/useFormat";
import { createPaymentService } from "@/services/paymentService";

const ServicesHomeScreen = () => {
  const { name } = useRoute().params as { name: string };
  const { startLoading, stopLoading } = useLoading();
  const { translation } = useLanguage();
  const navigation = useNavigation<any>();

  const [serviceDetails, setServiceDetails] = useState<ServiceDetailType>();
  const [bookingInfo, setBookingInfo] = useState<null | {
    id: string;
    paid: boolean;
    date: string;
  }>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      setIsLoading(true);
      try {
        const serviceDetails = await getServiceDetail(name);

        const image = await getServiceImages(serviceDetails[0].id);
        setServiceDetails({ ...serviceDetails[0], images: image });

        const booking = await checkHadBooking(name);

        if (booking && booking.paid) {
          setBookingInfo(booking);
        } else setBookingInfo(null);
      } catch (err) {
        console.log("Không có booking hoặc lỗi khi tải dữ liệu:", err);
      } finally {
        setIsLoading(false);
        stopLoading();
      }
    };

    fetchData();
  }, []);

  const handleBooking = () => {
    navigation.navigate("Booking", {
      screen: "BookingOverview",
      params: {
        monthPrice: serviceDetails?.priceOfMonth,
        yearPrice: serviceDetails?.priceOfYear,
        serviceId: serviceDetails?.id,
      },
    });
  };

  const handlePayment = async () => {
    try {
      const response = await createPaymentService(bookingInfo?.id || "");
    } catch (error) {
      console.log("Error during payment:", error);
    }
  };

  const handleViewBooking = async () => {
    try {
      const response = await getMyBooking();
      const booking = response.find((item: any) => item.id === bookingInfo?.id);
      navigation.navigate("Booking", {
        screen: "BookingDetail",
        params: { serviceData: booking },
      });
    } catch (error) {
      console.log("Error viewing booking:", error);
    }
  };

  if (!serviceDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{translation.loading}</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <SlideShow item={serviceDetails?.images || []} />
      <View style={styles.detailContainer}>
        {/* Tiêu đề dịch vụ */}
        <Text style={styles.title}>{serviceDetails?.serviceName}</Text>

        {/* Mô tả */}
        <Text style={styles.sectionTitle}>{translation.introduce}</Text>
        <Text style={styles.description}>{serviceDetails?.description}</Text>

        {/* Giá cả */}
        <Text style={styles.sectionTitle}>💰 {translation.price}</Text>
        <View style={styles.priceTable}>
          {serviceDetails?.typeOfMonth && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{translation.month}</Text>
              <Text style={styles.priceValue}>
                {formatVND(serviceDetails?.priceOfMonth)}
              </Text>
            </View>
          )}
          {serviceDetails?.typeOfYear && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>{translation.year}</Text>
              <Text style={styles.priceValue}>
                {formatVND(serviceDetails?.priceOfYear)}
              </Text>
            </View>
          )}
        </View>

        {/* Trạng thái booking */}
        {bookingInfo === null && (
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleBooking}
          >
            {translation.bookNow}
          </Button>
        )}

        {bookingInfo && !bookingInfo.paid && (
          <View>
            <Text style={styles.pendingText}>
              Đã đặt lịch vào {bookingInfo.date}, nhưng chưa thanh toán.
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handlePayment}
            >
              Thanh toán ngay
            </Button>
          </View>
        )}

        {bookingInfo && bookingInfo.paid && (
          <View>
            <Text style={styles.successText}>
              Bạn đã đăng ký và thanh toán dịch vụ này.
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleViewBooking}
            >
              Xem chi tiết booking
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ServicesHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 10,
  },
  detailContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  priceTable: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 6,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  pendingText: {
    color: "orange",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

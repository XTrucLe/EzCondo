import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SlideShow } from "@/components/ui/SlideShow";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "react-native-paper";
import { useNavigation } from "expo-router";
import { getServiceDetail, getServiceImages } from "@/services/servicesService";
import { checkHadBooking } from "@/services/bookingService";
import { useLoading } from "@/hooks/useLoading";

const ServicesDetailScreen = () => {
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
        if (booking) {
          setBookingInfo(booking);
        }
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
    navigation.navigate("booking", {
      monthPrice: serviceDetails?.priceOfMonth,
      yearPrice: serviceDetails?.priceOfYear,
      serviceId: serviceDetails?.id,
    });
  };

  const handlePayment = () => {
    navigation.navigate("payment", { bookingId: bookingInfo?.id });
  };

  const handleViewBooking = () => {
    navigation.navigate("bookingDetail", { bookingId: bookingInfo?.id });
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
            <Text style={styles.priceRow}>
              {translation.month}:{" "}
              <Text style={styles.price}>
                {serviceDetails?.priceOfMonth} VND
              </Text>
            </Text>
          )}
          {serviceDetails?.typeOfYear && (
            <Text style={styles.priceRow}>
              {translation.year}:{" "}
              <Text style={styles.price}>
                {serviceDetails?.priceOfYear} VND
              </Text>
            </Text>
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

export default ServicesDetailScreen;

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
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
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

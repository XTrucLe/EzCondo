import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SlideShow } from "@/components/ui/SlideShow";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "react-native-paper";
import { useNavigation } from "expo-router";
import { getServiceImages } from "@/services/servicesService";

const ServicesDetailScreen = () => {
  const { service, data } = useRoute().params as {
    service: string;
    data: ServiceDetailType[];
  };
  const { translation } = useLanguage();
  const navigation = useNavigation<any>();
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailType>({
    ...data[0],
    images: [],
  });

  useEffect(() => {
    const fetchImages = async () => {
      const image = await getServiceImages(serviceDetails.id);
      setServiceDetails((prev) => ({ ...prev, images: image }));
    };
    fetchImages();
  }, []);
  const handleBooking = () => {
    // Handle booking logic here
    navigation.navigate("booking", {
      monthPrice: serviceDetails.priceOfMonth,
      yearPrice: serviceDetails.priceOfYear,
    });
    console.log("Booking service:", serviceDetails.serviceName);
  };
  return (
    <ScrollView style={styles.container}>
      <SlideShow item={serviceDetails.images || []} />
      {/* Tiêu đề */}
      <Text style={styles.title}>{serviceDetails.serviceName}</Text>

      {/* Giới thiệu */}
      <Text style={styles.sectionTitle}>🌊 {translation.introduce}</Text>
      <Text style={styles.description}>{serviceDetails.description}</Text>

      {/* Giá cả */}
      <Text style={styles.sectionTitle}>💰 {translation.price}</Text>
      <View style={styles.priceTable}>
        {serviceDetails.typeOfMonth && (
          <Text style={styles.priceRow}>
            {translation.month}:{" "}
            <Text style={styles.price}>{serviceDetails.priceOfMonth} VND</Text>
          </Text>
        )}
        {serviceDetails.typeOfYear && (
          <Text style={styles.priceRow}>
            {translation.year}:{" "}
            <Text style={styles.price}>{serviceDetails.priceOfYear} VND</Text>
          </Text>
        )}
      </View>

      {/* Nút đặt lịch */}
      <Button mode="contained" style={styles.button} onPress={handleBooking}>
        {translation.bookNow}
      </Button>
    </ScrollView>
  );
};

export default ServicesDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
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
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
  },
  facilityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  facilityItem: {
    alignItems: "center",
  },
  priceTable: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
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
    marginBottom: 30,
  },
});

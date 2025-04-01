import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SlideShow } from "@/components/ui/SlideShow";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "react-native-paper";
import { fakeData } from "@/constants/AppServices";

const ServicesDetailScreen = () => {
  const { service } = useRoute().params as { service: string };
  const { translation } = useLanguage();
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailType>({
    id: "",
    name: "",
    description: "",
    images: [],
    price: [],
    status: "",
  });
  useEffect(() => {
    const getServiceDetail = async () => {
      try {
        // const response = await getServices(serviceId);
        // console.log(response);

        // setServiceDetails(response.data);
        setServiceDetails(fakeData[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getServiceDetail();
  }, [service]);

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking service:", serviceDetails.name);
  };
  return (
    <ScrollView style={styles.container}>
      <SlideShow item={serviceDetails.images} />
      {/* Tiêu đề */}
      <Text style={styles.title}>{serviceDetails.name}</Text>

      {/* Giới thiệu */}
      <Text style={styles.sectionTitle}>🌊 {translation.introduce}</Text>
      <Text style={styles.description}>{serviceDetails.description}</Text>

      {/* Tiện ích */}
      <Text style={styles.sectionTitle}>✨ {translation.facilities}</Text>
      <View style={styles.facilityContainer}>
        {serviceDetails?.facilities?.map((item, index) => (
          <View key={index} style={styles.facilityItem}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </View>

      {/* Giá cả */}
      <Text style={styles.sectionTitle}>💰 {translation.price}</Text>
      <View style={styles.priceTable}>
        {serviceDetails.price?.length ? (
          serviceDetails.price.map((item, index) => (
            <Text key={index} style={styles.priceRow}>
              {item.name}: <Text style={styles.price}>{item.price} VND</Text>
            </Text>
          ))
        ) : (
          <Text style={styles.descriptionText}>{translation.noPrice}</Text>
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

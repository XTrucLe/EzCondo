import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import ServiceCard, { Service } from "../ServiceCard";
import { useNavigation } from "expo-router";
import { getServiceDetail } from "@/services/servicesService";

const ServiceOverview = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = React.useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getServiceDetail();
      console.log("response", response);
      setData(response);
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* header had  */}
      {data ? (
        data.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))
      ) : (
        <Text>Không có dịch vụ nào.</Text>
      )}
    </ScrollView>
  );
};

export default ServiceOverview;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
});

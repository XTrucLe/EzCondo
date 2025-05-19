import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import ServiceCard, { Service } from "../ServiceCard";
import { useNavigation } from "expo-router";
import { getServiceDetailAndImage } from "@/services/servicesService";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";

const ServiceOverview = () => {
  const navigation = useNavigation<any>();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [data, setData] = React.useState<ServiceDetailType[]>([]);

  const fetchData = async () => {
    try {
      const response = await getServiceDetailAndImage();
      console.log("response", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
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

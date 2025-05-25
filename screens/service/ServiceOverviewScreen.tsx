import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { getServiceDetailAndImage } from "@/services/servicesService";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import ServiceCard from "@/components/ui/ServiceCard";
import { StatusScreen } from "./../../components/ui/screen/StatusScreen";

export default function ServiceOverviewScreen(){
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [data, setData] = React.useState<ServiceDetailType[]>([]);

  const fetchData = async () => {
    try {
      const response = await getServiceDetailAndImage();

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
        <StatusScreen type="empty" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#F5F5F5" },
});

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";
import { getServiceDetail } from "@/services/servicesService";
type Service = {
  id: string;
  name: string;
  icon: string;
  description: string;
};
const servicesData: Service[] = [
  {
    id: "swim",
    name: "Swimming",
    icon: "🏊‍♂️",
    description: "Enjoy access to the pool",
  },
  { id: "gym", name: "Gym", icon: "🏋️‍♂️", description: "Modern gym facilities" },
];

const ListServices = () => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();
  const [services, setServices] = React.useState<Service[]>(servicesData);

  const handleOnPress = async (service: Service) => {
    try {
      const response = await getServiceDetail(service.id);
      if (!response || (Array.isArray(response) && response.length === 0)) {
        Alert.alert("Info", "Comming soon");
        return;
      }
      console.log("response", response);

      navigation.navigate("detail", { service, data: response });
    } catch (error) {
      Alert.alert("Info", "Comming soon");
      return;
    }
  };
  return (
    <View style={styles.container}>
      {services.map((service: Service) => (
        <TouchableOpacity
          key={service.id}
          style={styles.card}
          onPress={handleOnPress.bind(this, service)}
        >
          <Text style={styles.icon}>{service.icon}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.description}>{service?.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ListServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: "center",
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

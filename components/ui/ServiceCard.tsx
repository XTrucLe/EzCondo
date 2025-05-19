import { formatVND } from "@/hooks/useFormat";
import { useLanguage } from "@/hooks/useLanguage";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  service: ServiceDetailType;
};

const ServiceCard = ({ service }: Props) => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();

  const handleRegister = () => {
    navigation.navigate("subscription", { service });
  };

  const firstImage = service.images?.[0]?.imgPath;

  return (
    <View style={styles.card}>
      {firstImage && (
        <Image
          source={{ uri: firstImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <Text style={styles.title}>{service.serviceName}</Text>

      <Text style={styles.label}>{translation.serviceDescription}</Text>
      <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
        {service.description}
      </Text>

      <View style={styles.statusContainer}>
        <Text style={styles.label}>{translation.status}</Text>
        <View style={styles.statusRow}>
          <Icon
            name={
              service.status === "active"
                ? "checkbox-marked-circle"
                : "close-circle"
            }
            size={18}
            color={service.status === "active" ? "#28a745" : "#dc3545"}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.statusText,
              service.status === "active" ? styles.active : styles.inactive,
            ]}
          >
            {service.status === "active"
              ? translation.statusActive
              : translation.statusInactive}
          </Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        {service.typeOfMonth && (
          <Text style={styles.price}>
            {translation.month}: {formatVND(service.priceOfMonth)}
          </Text>
        )}
        {service.typeOfYear && (
          <Text style={styles.price}>
            {translation.year}: {formatVND(service.priceOfYear)}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          service.status !== "active" && styles.buttonDisabled,
        ]}
        onPress={handleRegister}
        disabled={service.status !== "active"}
      >
        <Text style={styles.buttonText}>
          {service.status === "active"
            ? translation.regis
            : translation.notAvailable}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  statusContainer: {
    marginTop: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  statusText: {
    fontWeight: "700",
    fontSize: 14,
  },
  active: {
    color: "#28a745", // xanh lá (green)
  },
  inactive: {
    color: "#dc3545", // đỏ (red)
  },

  priceRow: {
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ServiceCard;

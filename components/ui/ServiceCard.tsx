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

export default function ServiceCard({ service }: Props) {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();

  const handleRegister = () => {
    navigation.navigate("service_detail", { data: service });
  };

  const firstImage = service.images?.[0]?.imgPath;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleRegister}
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        {firstImage && (
          <Image
            source={{ uri: firstImage }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {service.serviceName}
            </Text>

            <View
              style={[
                styles.statusBadge,
                service.status === "active"
                  ? styles.activeBadge
                  : styles.inactiveBadge,
              ]}
            >
              <Icon
                name={service.status === "active" ? "check" : "close"}
                size={14}
                color="#fff"
              />
              <Text style={styles.statusText}>
                {service.status === "active"
                  ? translation.statusActive
                  : translation.statusInactive}
              </Text>
            </View>
          </View>

          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {service.description}
          </Text>

          <View style={styles.priceContainer}>
            {service.typeOfMonth && (
              <Text style={styles.price}>
                {formatVND(service.priceOfMonth)}/{translation.month}
              </Text>
            )}
            {service.typeOfYear && (
              <Text style={styles.price}>
                {formatVND(service.priceOfYear)}/{translation.year}
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
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: "100%", // hoặc "100%" nếu full chiều ngang
  },
  row: {
    flexDirection: "row",
  },
  image: {
    width: "40%",
    height: 140,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
    lineHeight: 18,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#28a745",
  },
  inactiveBadge: {
    backgroundColor: "#dc3545",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 2,
    fontWeight: "500",
  },
  priceContainer: {
    marginVertical: 6,
  },
  price: {
    fontSize: 13,
    color: "#333",
    marginBottom: 2,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  buttonDisabled: {
    backgroundColor: "#e9ecef",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
});

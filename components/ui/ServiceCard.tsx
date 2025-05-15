import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export type Service = {
  id: string;
  serviceName: string;
  description: string;
  priceOfMonth: number;
  priceOfYear: number;
  typeOfMonth: boolean;
  typeOfYear: boolean;
  status: "active" | "inactive";
};

type Props = {
  service: Service;
};

const ServiceCard = ({ service }: Props) => {
  const navigation = useNavigation<any>();

  const handleRegister = () => {
    navigation.navigate("subscription", { service });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.serviceName}</Text>

      <Text style={styles.label}>Mô tả:</Text>
      <Text style={styles.text}>{service.description}</Text>

      <Text style={styles.label}>Tình trạng:</Text>
      <Text
        style={[
          styles.status,
          service.status === "active" ? styles.active : styles.inactive,
        ]}
      >
        {service.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
      </Text>

      <View style={styles.priceRow}>
        {service.typeOfMonth && (
          <Text style={styles.price}>Tháng: {service.priceOfMonth}đ</Text>
        )}
        {service.typeOfYear && (
          <Text style={styles.price}>Năm: {service.priceOfYear}đ</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={service.status !== "active"}
      >
        <Text style={styles.buttonText}>
          {service.status === "active" ? "Đăng ký" : "Không khả dụng"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#555",
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
  status: {
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 13,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  active: {
    backgroundColor: "#e6f4ea",
    color: "#1e7d32",
  },
  inactive: {
    backgroundColor: "#fdecea",
    color: "#c62828",
  },
  priceRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    opacity: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ServiceCard;

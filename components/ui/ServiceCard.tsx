import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  status: "registered" | "unregistered";
  registerDate?: string;
  expireDate?: string;
};

type Props = {
  service: Service;
};

const ServiceCard = ({ service }: Props) => {
  const isRegistered = service.status === "registered";
  const navigation = useNavigation<any>();
  const handleNext = () => {
    navigation.navigate("subscription", { service });
  };
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{service.name}</Text>
        <Text
          style={[
            styles.status,
            isRegistered ? styles.registered : styles.unregistered,
          ]}
        >
          {isRegistered ? "Đã đăng ký" : "Chưa đăng ký"}
        </Text>
      </View>

      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.price}>
        💰 {service.price.toLocaleString()}đ / tháng
      </Text>

      {isRegistered && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            📅 Đăng ký: {service.registerDate}
          </Text>
          <Text style={styles.infoText}>⏳ Hạn dùng: {service.expireDate}</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        {isRegistered ? (
          <>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Gia hạn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerButton}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Đăng ký ngay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  registered: {
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
  },
  unregistered: {
    backgroundColor: "#f8d7da",
    color: "#842029",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007BFF",
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#333",
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dangerButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ServiceCard;

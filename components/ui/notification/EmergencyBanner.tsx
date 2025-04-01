import { applicationImages } from "@/constants/ImageLink";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface EmergencyBannerProps {
  logo?: string;
  time: string;
  title: string;
  message: string;
  onFollow: () => void;
}

const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  logo = applicationImages,
  time,
  title,
  message,
  onFollow,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <View style={styles.banner}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onFollow}>
        <Text style={styles.buttonText}>Theo dõi ngay</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsVisible(false)}
        style={styles.closeButton}
      >
        <Text style={styles.closeText}>✖</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  logo: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  content: { flex: 1 },
  time: { fontSize: 12, color: "#fff", opacity: 0.8 },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff", marginVertical: 2 },
  message: { fontSize: 14, color: "#fff" },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: { color: "#ff4d4d", fontWeight: "bold" },
  closeButton: { marginLeft: 10, padding: 5 },
  closeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default EmergencyBanner;

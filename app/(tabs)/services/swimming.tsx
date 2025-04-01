import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Swimming() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {/* Ảnh Header */}
      <Image
        source={{
          uri: "https://www.cantho.gov.vn/wps/wcm/connect/407004b1-1988-425a-9989-b10a5e210608/1/b.png?MOD=AJPERES&CACHEID=407004b1-1988-425a-9989-b10a5e210608/1",
        }}
        style={styles.headerImage}
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>Hồ bơi cao cấp</Text>

      {/* Giới thiệu */}
      <Text style={styles.sectionTitle}>🌊 Giới thiệu</Text>
      <Text style={styles.description}>
        Hồ bơi hiện đại với hệ thống lọc nước tiên tiến, đạt tiêu chuẩn quốc tế.
        Phù hợp cho cả gia đình, trẻ em và người lớn với nhiều khu vực riêng
        biệt.
      </Text>

      {/* Tiện ích */}
      <Text style={styles.sectionTitle}>✨ Tiện ích</Text>
      <View style={styles.facilityContainer}>
        <View style={styles.facilityItem}>
          <Ionicons name="fitness-outline" size={24} color="#007AFF" />
          <Text>Huấn luyện viên</Text>
        </View>
        <View style={styles.facilityItem}>
          <Ionicons name="thermometer-outline" size={24} color="#007AFF" />
          <Text>Nước nóng</Text>
        </View>
        <View style={styles.facilityItem}>
          <Ionicons name="happy-outline" size={24} color="#007AFF" />
          <Text>Khu vui chơi</Text>
        </View>
      </View>

      {/* Giá vé */}
      <Text style={styles.sectionTitle}>💰 Giá vé</Text>
      <View style={styles.priceTable}>
        <Text style={styles.priceRow}>
          👶 Trẻ em: <Text style={styles.price}>50.000đ</Text>
        </Text>
        <Text style={styles.priceRow}>
          🧑 Người lớn: <Text style={styles.price}>100.000đ</Text>
        </Text>
        <Text style={styles.priceRow}>
          🎫 Vé tháng: <Text style={styles.price}>800.000đ</Text>
        </Text>
      </View>

      {/* Đánh giá */}
      <Text style={styles.sectionTitle}>⭐ Đánh giá từ khách hàng</Text>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>
          "Hồ bơi sạch, rộng rãi và an toàn. Tôi rất thích!"
        </Text>
        <Text style={styles.reviewAuthor}>- Nguyễn Văn A</Text>
      </View>

      {/* Nút đặt lịch */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("booking", {
            monthPrice: 100000,
            yearPrice: 800000,
          })
        }
      >
        <Text style={styles.buttonText}>Đặt lịch ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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
  reviewContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  reviewText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
  },
  reviewAuthor: {
    fontSize: 14,
    color: "#007AFF",
    textAlign: "right",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

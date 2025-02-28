import { userInformation } from "@/constants/BackgroundImage";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const ProfileScreen = ({ user, onEditPress, onLogout }: any) => {
  return (
    <View style={styles.container}>
      {/* Ảnh đại diện */}
      <TouchableOpacity style={styles.avatarContainer} onPress={onEditPress}>
        <Image source={user.image} style={styles.avatar} />
      </TouchableOpacity>

      {/* Thông tin người dùng */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.role}>{user.role_name}</Text>

      {/* Card hiển thị thông tin */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={styles.label}>📄 CMND/CCCD:</Text>
            <Text style={styles.info}>{user.citizen_identity ?? "N/A"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>⚧ Giới tính:</Text>
            <Text style={styles.info}>
              {user.gender === "male"
                ? "Nam"
                : user.gender === "female"
                ? "Nữ"
                : "Chưa cập nhật"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>📅 Ngày sinh:</Text>
            <Text style={styles.info}>
              {user.date_of_birth ?? "Chưa cập nhật"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>✉️ Email:</Text>
            <Text style={styles.info}>{user.email ?? "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>📞 Số điện thoại:</Text>
            <Text style={styles.info}>{user.phone_number ?? "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>🏠 Căn hộ:</Text>
            <Text style={styles.info}>{user.apartment_number ?? "N/A"}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

// Giao diện styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 60,
    padding: 5,
    marginTop: 30,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  role: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  info: {
    color: "#333",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    width: "80%",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "#FF3B30",
    width: "80%",
  },
});

export default () => (
  <ProfileScreen
    user={userInformation}
    onEditPress={() => alert("Chỉnh sửa")}
    onLogout={() => alert("Đăng xuất")}
  />
);

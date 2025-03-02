import { userInformation } from "@/constants/BackgroundImage";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const ProfileScreen = ({ user }: any) => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "cardBackground");
  const UserInfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[styles.info, { color: textColor }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Ảnh đại diện */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Image source={user.image} style={styles.avatar} />
      </TouchableOpacity>

      {/* Thông tin người dùng */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.role}>{user.role_name}</Text>

      {/* Card hiển thị thông tin */}
      <Card style={[styles.card, { backgroundColor: cardColor }]}>
        <Card.Content>
          <UserInfoRow
            label="📄 CMND/CCCD:"
            value={user.citizen_identity ?? "N/A"}
          />
          <UserInfoRow
            label=" ⚧  Giới tính:"
            value={
              user.gender === "male"
                ? "Nam"
                : user.gender === "female"
                ? "Nữ"
                : "Chưa cập nhật"
            }
          />
          <UserInfoRow
            label="📅 Ngày sinh:"
            value={user.date_of_birth ?? "Chưa cập nhật"}
          />
          <UserInfoRow label="✉️ Email:" value={user.email ?? "N/A"} />
          <UserInfoRow
            label="📞 Số điện thoại:"
            value={user.phone_number ?? "N/A"}
          />
          <UserInfoRow
            label="🏠 Căn hộ:"
            value={user.apartment_number ?? "N/A"}
          />
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
    paddingVertical: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 16,
  },
  info: {
    color: "#333",
    maxWidth: "60%",
    textOverflow: "ellipsis",
    fontSize: 16,
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
  />
);

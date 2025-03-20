import { userDefaultImage } from "@/constants/ImageLink";
import { profileFields } from "@/constants/profile_form";
import useAuthStore from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UserProps as OriginalUserProps } from "@/services/UserService";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-paper";

interface UserProps extends OriginalUserProps {
  [key: string]: any;
}

const ProfileScreen = () => {
  const { user } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "cardBackground");
  const [userInfo, setUserInfo] = React.useState<UserProps>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        setUserInfo(user);
      }
    };
    fetchUserInfo();
  }, [user]);

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
        <Image
          source={userInfo?.image ? { uri: userInfo.image } : userDefaultImage}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Thông tin người dùng */}
      <Text style={styles.name}>{user?.fullName}</Text>
      <Text style={styles.role}>{user?.roleName}</Text>

      {/* Card hiển thị thông tin */}
      <Card style={[styles.card, { backgroundColor: cardColor }]}>
        <Card.Content>
          {profileFields
            .filter(({ name }) => name != "fullName")
            .map(({ label, name }) => (
              <UserInfoRow
                key={name}
                label={label}
                value={userInfo?.[name] ?? "N/A"}
              />
            ))}
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

export default () => <ProfileScreen />;

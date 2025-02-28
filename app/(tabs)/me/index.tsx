import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Avatar, Button, Card, List } from "react-native-paper";
import { userInformation } from "@/constants/BackgroundImage";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const colors = useThemeColor({}, "background");
  const userInfo = userInformation;
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "cardBackground");
  const iconColor = useThemeColor({}, "icon");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const storedDarkMode = await SecureStore.getItem("darkMode");
    const storedLanguage = await SecureStore.getItem("language");
    const stored2FA = await SecureStore.getItem("twoFactorAuth");

    setDarkMode(storedDarkMode === "true");
    setLanguage(storedLanguage || "Tiếng Việt");
    setTwoFactorAuth(stored2FA === "true");
  };

  const toggleDarkMode = async () => {
    setDarkMode((prev) => !prev);
    await SecureStore.setItem("darkMode", (!darkMode).toString());
  };

  const toggleTwoFactorAuth = async () => {
    setTwoFactorAuth((prev) => !prev);
    await SecureStore.setItem("twoFactorAuth", (!twoFactorAuth).toString());
  };

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "login" as never }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Thẻ Thông Tin Người Dùng */}
        <TouchableOpacity
          onPress={() => navigation.navigate("profile" as never)}
        >
          <Card style={[styles.profileCard, { backgroundColor: cardColor }]}>
            <View style={styles.profileInfo}>
              <Avatar.Image size={60} source={userInfo.image} />
              <View style={{ marginLeft: 15 }}>
                <Text style={[styles.name, { color: textColor }]}>
                  {userInfo.name}
                </Text>
                <Text style={{ color: textColor }}>
                  Căn hộ: {userInfo.apartment_number}
                </Text>
              </View>
              <List.Icon icon="chevron-right" color={iconColor} />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Cài đặt chung */}
        <List.Section>
          <List.Subheader style={{ color: textColor }}>
            Cài đặt chung
          </List.Subheader>

          <List.Item
            title="Chế độ tối"
            left={() => <List.Icon icon="theme-light-dark" color={iconColor} />}
            right={() => (
              <Switch value={darkMode} onValueChange={toggleDarkMode} />
            )}
          />

          <List.Item
            title="Ngôn ngữ"
            description={language}
            left={() => <List.Icon icon="translate" color={iconColor} />}
            onPress={() =>
              setLanguage(language === "English" ? "Tiếng Việt" : "English")
            }
          />

          <List.Item
            title="Xác thực 2 lớp"
            left={() => <List.Icon icon="shield-lock" color={iconColor} />}
            right={() => (
              <Switch
                value={twoFactorAuth}
                onValueChange={toggleTwoFactorAuth}
              />
            )}
          />
        </List.Section>

        {/* Hỗ trợ & Cài đặt */}
        <List.Section>
          <List.Subheader style={{ color: textColor }}>Hỗ trợ</List.Subheader>

          <List.Item
            title="Trung tâm trợ giúp"
            left={() => <List.Icon icon="help-circle" color={iconColor} />}
            onPress={() => navigation.navigate("support" as never)}
          />

          <List.Item
            title="Cài đặt tài khoản"
            left={() => <List.Icon icon="account-cog" color={iconColor} />}
            onPress={() => navigation.navigate("settings" as never)}
          />
        </List.Section>

        {/* Đăng xuất */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Đăng xuất
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  content: { flex: 1, padding: 20 },
  profileCard: {
    width: "96%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
  },
});

export default ProfileScreen;

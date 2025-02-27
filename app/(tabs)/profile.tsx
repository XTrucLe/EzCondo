import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Avatar, Button, List } from "react-native-paper";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const storedDarkMode = await SecureStore.getItem("darkMode");
    const storedLanguage = await SecureStore.getItem("language");
    const stored2FA = await SecureStore.getItem("twoFactorAuth");

    setDarkMode(storedDarkMode === "true");
    setLanguage(storedLanguage || "English");
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
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: darkMode ? "#222" : "#fff",
        }}
      >
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Avatar.Image
            size={80}
            source={require("../../assets/images/Avata_user.png")}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
              color: darkMode ? "#fff" : "#000",
            }}
          >
            Nguyễn Thị Bích Phương
          </Text>
          <Text style={{ color: darkMode ? "#bbb" : "#555" }}>
            Căn hộ: A1-12
          </Text>
        </View>

        {/* Cài đặt */}
        <List.Section>
          <List.Subheader style={{ color: darkMode ? "#fff" : "#000" }}>
            Cài đặt chung
          </List.Subheader>

          {/* Chế độ tối */}
          <List.Item
            title="Chế độ tối"
            left={() => <List.Icon icon="theme-light-dark" />}
            right={() => (
              <Switch value={darkMode} onValueChange={toggleDarkMode} />
            )}
          />

          {/* Ngôn ngữ */}
          <List.Item
            title="Ngôn ngữ"
            description={language}
            left={() => <List.Icon icon="translate" />}
            onPress={() =>
              setLanguage(language === "English" ? "Tiếng Việt" : "English")
            }
          />

          {/* Xác thực hai lớp */}
          <List.Item
            title="Xác thực 2 lớp"
            left={() => <List.Icon icon="shield-lock" />}
            right={() => (
              <Switch
                value={twoFactorAuth}
                onValueChange={toggleTwoFactorAuth}
              />
            )}
          />
        </List.Section>

        {/* Đăng xuất */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={{ marginTop: 20, backgroundColor: "#FF3B30" }}
        >
          Đăng xuất
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;

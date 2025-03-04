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
import { userInformation } from "@/constants/FakeDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const userInfo = userInformation;
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "cardBackground");
  const iconColor = useThemeColor({}, "icon");
  const logoutButtonColor = useThemeColor({}, "error");

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
            routes: [{ name: "auth" as never }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate("profile" as never)}>
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

      <List.Section>
        <List.Subheader style={[styles.subHeader, { color: textColor }]}>
          Cài đặt chung
        </List.Subheader>
        <List.Item
          title="Chế độ tối"
          left={() => <List.Icon icon="theme-light-dark" color={iconColor} />}
          right={() => (
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          )}
          style={styles.listItem}
        />
        <List.Item
          title="Ngôn ngữ"
          description={language}
          left={() => <List.Icon icon="translate" color={iconColor} />}
          onPress={() =>
            setLanguage(language === "English" ? "Tiếng Việt" : "English")
          }
          style={styles.listItem}
        />
        <List.Item
          title="Xác thực 2 lớp"
          left={() => <List.Icon icon="shield-lock" color={iconColor} />}
          right={() => (
            <Switch value={twoFactorAuth} onValueChange={toggleTwoFactorAuth} />
          )}
          style={styles.listItem}
        />
      </List.Section>

      <List.Section>
        <List.Subheader style={[styles.subHeader, { color: textColor }]}>
          Hỗ trợ
        </List.Subheader>
        <List.Item
          title="Trung tâm trợ giúp"
          left={() => <List.Icon icon="help-circle" color={iconColor} />}
          onPress={() => navigation.navigate("support" as never)}
          style={styles.listItem}
        />
        <List.Item
          title="Cài đặt tài khoản"
          left={() => <List.Icon icon="account-cog" color={iconColor} />}
          onPress={() => navigation.navigate("profile_edit" as never)}
          style={styles.listItem}
        />
      </List.Section>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={[styles.logoutButton, { backgroundColor: logoutButtonColor }]}
      >
        Đăng xuất
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, marginTop: 20 },
  profileCard: {
    width: "96%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 18, fontWeight: "bold" },
  subHeader: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    paddingLeft: 15,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default ProfileScreen;

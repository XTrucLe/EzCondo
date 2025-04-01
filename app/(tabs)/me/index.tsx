import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/hooks/useAuth";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Avatar, Button, Card, List } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { userDefaultImage } from "@/constants/ImageLink";
import { useLanguage } from "@/hooks/useLanguage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout, user: userInfo } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardColor = useThemeColor({}, "cardBackground");
  const iconColor = useThemeColor({}, "icon");
  const logoutButtonColor = useThemeColor({}, "error");

  const { translation, setLanguage, currentLang } = useLanguage();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const storedDarkMode = await SecureStore.getItem("darkMode");
    const stored2FA = await SecureStore.getItem("twoFactorAuth");

    setDarkMode(storedDarkMode === "true");
    setTwoFactorAuth(stored2FA === "true");
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await SecureStore.setItem("darkMode", newDarkMode.toString());
  };

  const toggleTwoFactorAuth = async () => {
    const new2FA = !twoFactorAuth;
    setTwoFactorAuth(new2FA);
    await SecureStore.setItem("twoFactorAuth", new2FA.toString());
  };

  const handleLogout = () => {
    Alert.alert(
      `${translation.confirm} ${translation.logout}`,
      translation.confirmLogout,
      [
        { text: translation.cancel, style: "cancel" },
        {
          text: translation.logout,
          onPress: async () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "auth" as never }],
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate("profile" as never)}>
        <Card style={[styles.profileCard, { backgroundColor: cardColor }]}>
          <View style={styles.profileInfo}>
            <Avatar.Image
              size={60}
              source={
                userInfo?.avatar ? { uri: userInfo.avatar } : userDefaultImage
              }
            />
            <View style={{ marginLeft: 15 }}>
              <Text style={[styles.name, { color: textColor }]}>
                {userInfo?.fullName}
              </Text>
              <Text style={{ color: textColor }}>
                Căn hộ: {userInfo?.apartmentNumber}
              </Text>
            </View>
            <List.Icon
              icon="chevron-right"
              color={iconColor}
              style={{ position: "absolute", right: 10 }}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <List.Section>
        <List.Subheader style={[styles.subHeader, { color: textColor }]}>
          {translation.generalSetting}
        </List.Subheader>
        <List.Item
          title={translation.darkMode}
          left={() => <List.Icon icon="theme-light-dark" color={iconColor} />}
          right={() => (
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          )}
          style={styles.listItem}
        />
        <List.Item
          title={translation.language}
          description={currentLang === "en" ? "English" : "Tiếng Việt"}
          left={() => <List.Icon icon="translate" color={iconColor} />}
          onPress={() => setLanguage(currentLang === "en" ? "vi" : "en")}
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
          {translation.support}
        </List.Subheader>
        <List.Item
          title="Trung tâm trợ giúp"
          left={() => <List.Icon icon="help-circle" color={iconColor} />}
          onPress={() => navigation.navigate("support" as never)}
          style={styles.listItem}
        />
        <List.Item
          title={translation.accountSetting}
          left={() => <List.Icon icon="account-cog" color={iconColor} />}
          onPress={() => navigation.navigate("profile_edit" as never)}
          style={styles.listItem}
        />
        <List.Item
          title={translation.accountSetting}
          left={() => <List.Icon icon="account-cog" color={iconColor} />}
          onPress={() => navigation.navigate("changePassword" as never)}
          style={styles.listItem}
        />
      </List.Section>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={[styles.logoutButton, { backgroundColor: logoutButtonColor }]}
      >
        {translation.logout}
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

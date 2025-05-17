import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Avatar, Button, Card, List } from "react-native-paper";
import { useNavigation } from "expo-router";

// Custom hooks and utilities
import useAuthStore from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguage } from "@/hooks/useLanguage";
import { userDefaultImage } from "@/constants/ImageLink";
import { ScrollView } from "react-native";

// Types
type SettingItem = {
  id: string;
  title: string;
  icon: string;
  action?: () => void;
  rightComponent?: React.ReactNode;
  description?: string;
};

const ProfileScreen = () => {
  // Hooks and state
  const navigation = useNavigation();
  const { logout, user: userInfo } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const { translation, setLanguage, currentLang } = useLanguage();

  // Theme colors
  const theme = {
    background: useThemeColor({}, "background"),
    text: useThemeColor({}, "text"),
    cardBackground: useThemeColor({}, "cardBackground"),
    icon: useThemeColor({}, "icon"),
    error: useThemeColor({}, "error"),
  };

  // Load settings from secure storage
  useEffect(() => {
    const loadSettings = async () => {
      const [storedDarkMode, stored2FA] = await Promise.all([
        SecureStore.getItem("darkMode"),
        SecureStore.getItem("twoFactorAuth"),
      ]);

      setDarkMode(storedDarkMode === "true");
      setTwoFactorAuth(stored2FA === "true");
    };

    loadSettings();
  }, []);

  // Toggle handlers
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

  const handleLanguageChange = () => {
    setLanguage(currentLang === "en" ? "vi" : "en");
  };

  // Logout handler
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

  const paymentSettings: SettingItem[] = [
    {
      id: "paymentHistory",
      title: translation.paymentHistory,
      icon: "history",
      action: () => navigation.navigate("payment_history" as never),
    },
    {
      id: "pendingPayments",
      title: translation.paymentPending,
      icon: "clock-outline",
      action: () => navigation.navigate("payment_waiting" as never),
    },
  ];

  // Settings sections
  const generalSettings: SettingItem[] = [
    {
      id: "darkMode",
      title: translation.darkMode,
      icon: "theme-light-dark",
      rightComponent: (
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      ),
    },
    {
      id: "language",
      title: translation.language,
      icon: "translate",
      description: currentLang === "en" ? "English" : "Tiếng Việt",
      action: handleLanguageChange,
    },
    {
      id: "twoFactorAuth",
      title: translation.twoFactor,
      icon: "shield-lock",
      rightComponent: (
        <Switch value={twoFactorAuth} onValueChange={toggleTwoFactorAuth} />
      ),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: "helpCenter",
      title: "Trung tâm trợ giúp",
      icon: "help-circle",
      action: () => navigation.navigate("support" as never),
    },
    {
      id: "accountSettings",
      title: translation.accountSetting,
      icon: "account-cog",
      action: () => navigation.navigate("profile_edit" as never),
    },
    {
      id: "changePassword",
      title: translation.changePassword,
      icon: "lock-reset",
      action: () => navigation.navigate("changePassword" as never),
    },
  ];

  // Render function for settings items
  const renderSettingItem = (item: SettingItem) => (
    <List.Item
      key={item.id}
      title={item.title}
      description={item.description}
      left={() => <List.Icon icon={item.icon as any} color={theme.icon} />}
      right={() => item.rightComponent}
      onPress={item.action}
      style={styles.listItem}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* Profile Card */}
        <TouchableOpacity
          onPress={() => navigation.navigate("profile" as never)}
        >
          <Card
            style={[
              styles.profileCard,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View style={styles.profileInfo}>
              <Avatar.Image
                size={60}
                source={
                  userInfo?.avatar ? { uri: userInfo.avatar } : userDefaultImage
                }
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={[styles.name, { color: theme.text }]}>
                  {userInfo?.fullName}
                </Text>
                <Text style={{ color: theme.text }}>
                  Căn hộ: {userInfo?.apartmentNumber}
                </Text>
              </View>
              <List.Icon
                icon="chevron-right"
                color={theme.icon}
                style={{ position: "absolute", right: 10 }}
              />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Payment Settings Section */}
        <List.Section>
          <List.Subheader style={[styles.subHeader, { color: theme.text }]}>
            {translation.paymentHistory}
          </List.Subheader>
          {paymentSettings.map(renderSettingItem)}
        </List.Section>

        {/* Settings Sections */}
        <List.Section>
          <List.Subheader style={[styles.subHeader, { color: theme.text }]}>
            {translation.generalSetting}
          </List.Subheader>
          {generalSettings.map(renderSettingItem)}
        </List.Section>

        <List.Section>
          <List.Subheader style={[styles.subHeader, { color: theme.text }]}>
            {translation.support}
          </List.Subheader>
          {supportSettings.map(renderSettingItem)}
        </List.Section>

        {/* Logout Button */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.error }]}
        >
          {translation.logout}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginTop: 20,
  },
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
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
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

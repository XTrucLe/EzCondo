import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Avatar, Button, Card, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Custom hooks and utilities
import useAuthStore from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguage } from "@/hooks/useLanguage";
import { userDefaultImage } from "@/constants/ImageLink";
import { useAppNavigator } from "@/navigation/useAppNavigate";

// Types
type SettingItem = {
  id: string;
  title: string;
  icon: string;
  action?: () => void;
  rightComponent?: React.ReactNode;
  description?: string;
};

export default function SettingScreen() {
  // Hooks and state
  const navigation = useNavigation();
  const { navigate } = useAppNavigator();
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
      try {
        const [storedDarkMode, stored2FA] = await Promise.all([
          SecureStore.getItemAsync("darkMode"),
          SecureStore.getItemAsync("twoFactorAuth"),
        ]);

        setDarkMode(storedDarkMode === "true");
        setTwoFactorAuth(stored2FA === "true");
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Toggle handlers
  const toggleDarkMode = useCallback(async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await SecureStore.setItemAsync("darkMode", newDarkMode.toString());
  }, [darkMode]);

  const toggleTwoFactorAuth = useCallback(async () => {
    const new2FA = !twoFactorAuth;
    setTwoFactorAuth(new2FA);
    await SecureStore.setItemAsync("twoFactorAuth", new2FA.toString());
  }, [twoFactorAuth]);

  const handleLanguageChange = useCallback(() => {
    setLanguage(currentLang === "en" ? "vi" : "en");
  }, [currentLang, setLanguage]);

  // Logout handler
  const handleLogout = useCallback(() => {
    Alert.alert(
      `${translation.confirm} ${translation.logout}`,
      translation.confirmLogout,
      [
        { text: translation.cancel, style: "cancel" },
        {
          text: translation.logout,
          onPress: async () => {
            navigation.navigate("auth" as never);
          },
          style: "destructive",
        },
      ]
    );
  }, [logout, navigate, translation]);

  // Settings sections
  const paymentSettings: SettingItem[] = [
    {
      id: "paymentHistory",
      title: translation.paymentHistory,
      icon: "history",
      action: () => navigate("Payment", { screen: "PaymentHistory" }),
    },
    {
      id: "pendingPayments",
      title: translation.paymentPending,
      icon: "clock-outline",
      action: () => navigate("Payment", { screen: "PaymentWaiting" }),
    },
    {
      id: "incidentHistory",
      title: translation.incidentHistory,
      icon: "file-document-outline",
      action: () => navigate("Incident", { screen: "IncidentHistory" }),
    },
  ];

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
      title: "Feedback",
      icon: "help-circle",
      action: () => navigate("Feedback"),
    },
    {
      id: "accountSettings",
      title: translation.accountSetting,
      icon: "account-cog",
      action: () => {},
    },
    {
      id: "changePassword",
      title: translation.changePassword,
      icon: "lock-reset",
      action: () => navigate("ChangePassword"),
    },
  ];

  // Memoized render function for settings items
  const renderSettingItem = useCallback(
    (item: SettingItem) => (
      <List.Item
        key={item.id}
        title={item.title}
        description={item.description}
        left={() => <List.Icon icon={item.icon} color={theme.icon} />}
        right={() => item.rightComponent}
        onPress={item.action}
        style={styles.listItem}
      />
    ),
    [theme.icon]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Card */}
        <TouchableOpacity
          onPress={() => navigate("Profile", { screen: "ProfileOverview" })}
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
              <View style={styles.profileTextContainer}>
                <Text style={[styles.name, { color: theme.text }]}>
                  {userInfo?.fullName}
                </Text>
                <Text style={{ color: theme.text }}>
                  {translation.apartment}: {userInfo?.apartmentNumber}
                </Text>
              </View>
              <List.Icon
                icon="chevron-right"
                color={theme.icon}
                style={styles.profileChevron}
              />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Payment Settings Section */}
        <List.Section>
          <List.Subheader style={[styles.subHeader, { color: theme.text }]}>
            {translation.payment}
          </List.Subheader>
          {paymentSettings.map(renderSettingItem)}
        </List.Section>

        {/* General Settings Section */}
        <List.Section>
          <List.Subheader style={[styles.subHeader, { color: theme.text }]}>
            {translation.generalSetting}
          </List.Subheader>
          {generalSettings.map(renderSettingItem)}
        </List.Section>

        {/* Support Settings Section */}
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
          labelStyle={styles.logoutButtonText}
        >
          {translation.logout}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  scrollContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  profileChevron: {
    marginLeft: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subHeader: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listItem: {
    paddingLeft: 24,
  },
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 32,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

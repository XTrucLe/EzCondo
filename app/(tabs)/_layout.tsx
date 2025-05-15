import {
  Tabs,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { getFCMToken } from "@/services/firebaseService";

export default function TabLayout() {
  const theme = useColorScheme();
  const segment = useSegments();
  const navigationState = useRootNavigationState();
  const router = useRouter();
  const { verified, loading } = useAuthStore();
  const { translation } = useLanguage();

  useEffect(() => {
    getFCMToken();
  }, []);
  useEffect(() => {
    if (!navigationState?.key || loading) return;

    if (!verified) {
      router.replace("auth" as never);
    }
  }, [verified, loading, navigationState]);

  const dispalyScreens = ["(tabs)", "index", "services", "notifications", "me"];

  const isTabDisplay =
    !navigationState?.key ||
    dispalyScreens.includes(segment[segment.length - 1]);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? "light"].bottomTabActive,
        tabBarInactiveTintColor: Colors[theme ?? "light"].tabIconDefault,
        headerShown: false,
        animation: "shift",

        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          isTabDisplay
            ? {
                ...Platform.select({
                  ios: {
                    position: "absolute",
                  },
                  default: {},
                }),
              }
            : { display: "none" },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translation.home,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: translation.services,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="star" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: translation.notification,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="notifications" color={color} />
          ),
          headerShown: false,
          headerTitle: translation.notification,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: translation.profile,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

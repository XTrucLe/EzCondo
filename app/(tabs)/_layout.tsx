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
import { useAuth } from "@/hooks/AuthContext";

export default function TabLayout() {
  const theme = useColorScheme();
  const segment = useSegments();
  const navigationState = useRootNavigationState();
  const router = useRouter();
  const { isAuthenticating } = useAuth();

  useEffect(() => {
    // Redirect to login screen if not authenticated
    if (!navigationState?.key) return;
    if (!isAuthenticating) {
      router.replace("login" as never);
    }
  }, [isAuthenticating, navigationState]);

  const hiddenScreens = ["profile", "profile_edit", "chatbot", "support"];

  const isTabHidden =
    !navigationState?.key ||
    hiddenScreens.includes(segment[segment.length - 1]);

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
          isTabHidden
            ? { display: "none" }
            : {
                ...Platform.select({
                  ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: "absolute",
                  },
                  default: {},
                }),
              },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="star" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="notifications" color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

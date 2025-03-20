import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import useAuthStore from "@/hooks/useAuth";
import { AppState } from "react-native";
import { requestUserPermission } from "@/utils/permision/PushNotification";
import { getApiUrl, getFCMToken } from "@/services/firebaseService";
import {
  listenForBackgroundMessages,
  listenForForegroundMessages,
} from "@/services/notificationHandler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { startLogoutTimer, clearLogoutTimer } = useAuthStore();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "background" || state === "inactive") {
        startLogoutTimer(); // App vào nền → Bắt đầu đếm giờ
      } else if (state === "active") {
        clearLogoutTimer(); // App mở lại → Hủy đếm giờ
      }
    });

    return () => {
      subscription.remove();
      clearLogoutTimer();
    };
  }, []);

  useEffect(() => {
    const initialize = () => {
      requestUserPermission();
      getFCMToken();
      listenForForegroundMessages();
      listenForBackgroundMessages();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

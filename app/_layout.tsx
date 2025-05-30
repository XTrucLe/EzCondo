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
import { useNotificationListener } from "@/services/notificationHandler";
import LoadingOverlay from "@/components/LoadingOverlay";
import { PaperProvider } from "react-native-paper";
import SplashPage from "@/components/ui/screen/SplashPage";

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

  useNotificationListener();

  useEffect(() => {
    const initialize = () => {
      requestUserPermission();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <SplashPage />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <LoadingOverlay />
      </PaperProvider>
    </ThemeProvider>
  );
}

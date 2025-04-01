import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
import { Stack } from "expo-router";

export default function MeLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "Thông tin chủ căn hộ",
          headerRight: () => (
            <HeaderRightIcon
              iconName="pencil"
              navigationScreen="profile_edit"
            />
          ),
        }}
      />
      <Stack.Screen
        name="profile_edit"
        options={{ headerShown: true, headerTitle: "Trở lại" }}
      />
      <Stack.Screen name="support" options={{ headerShown: false }} />
      <Stack.Screen name="changePassword" options={{ headerShown: true }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function _layout() {
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
        options={{ headerShown: true, headerTitle: "Thông tin chủ căn hộ" }}
      />
      <Stack.Screen name="support" options={{ headerShown: false }} />
    </Stack>
  );
}

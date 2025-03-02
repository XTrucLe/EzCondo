import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Dịch vụ và tiện ích" }}
      />
      <Stack.Screen name="swimming" options={{ headerShown: true }} />
    </Stack>
  );
}

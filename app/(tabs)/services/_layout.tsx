import { Stack } from "expo-router";

export default function ServiceLayout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: "Dịch vụ và tiện ích",
        }}
      />
      <Stack.Screen
        name="service_detail"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen name="bill" options={{ headerShown: true }} />
      <Stack.Screen
        name="subscription"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="QRcode"
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}

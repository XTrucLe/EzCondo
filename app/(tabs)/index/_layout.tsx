import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="members" options={{ headerShown: true }} />
      <Stack.Screen name="add_member" options={{ headerShown: true }} />
      <Stack.Screen
        name="incident"
        options={{
          headerShown: true,
          headerTitle: "Báo cáo sự cố",
        }}
      />
    </Stack>
  );
}

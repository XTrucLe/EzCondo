import React from "react";
import { Stack } from "expo-router";

export default function NotificationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name="notification_details"
        options={{
          headerShown: true,
          title: "",
        }}
      />
    </Stack>
  );
}

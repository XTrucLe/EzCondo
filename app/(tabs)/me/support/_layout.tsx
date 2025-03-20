import React from "react";
import { Stack } from "expo-router";

export default function SupportLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Trở lại" }}
      />
      <Stack.Screen
        name="chatbot"
        options={{ headerShown: true, headerTitle: "Trung tâm hỗ trợ" }}
      />
    </Stack>
  );
}

import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgot_password"
        options={{ headerShown: true, headerTitle: "Quên mật khẩu" }}
      />
      <Stack.Screen
        name="otp"
        options={{ headerShown: true, headerTitle: "OTP" }}
      />
      <Stack.Screen
        name="reset_password"
        options={{ headerShown: true, headerTitle: "Nhập mật khẩu mới" }}
      />
    </Stack>
  );
}

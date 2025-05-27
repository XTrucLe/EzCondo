import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import SettingScreen from "@/screens/other/SettingScreen";
import PaymentNavigation from "./PaymentNavigation";
import FeedbackScreen from "@/screens/other/FeedbackScreen";
import ProfileNavigation from "./ProfileNavigation";
import IncidentNavigation from "./IncidentNavigation";
import ChangePasswordScreen from "@/screens/auth/ChangePasswordScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function SettingNavigation() {
  return (
    <Stacks.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <Stacks.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stacks.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{ headerShown: false }}
      />
      <Stacks.Screen
        name="Payment"
        component={PaymentNavigation}
        options={{ headerShown: false }}
      />
      <Stacks.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ headerShown: true, headerTitle: "Góp ý" }}
      />
      <Stacks.Screen
        name="Incident"
        component={IncidentNavigation}
        options={{ headerShown: false }}
      />
      <Stacks.Screen
        name="ChangePassword"
        component={ChangePasswordScreen} // Assuming Parking is similar to Payment
        options={{ headerShown: true, headerTitle: "Đổi mật khẩu" }}
      />
    </Stacks.Navigator>
  );
}

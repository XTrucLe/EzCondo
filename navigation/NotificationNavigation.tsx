import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import NotificationOverviewScreen from "@/screens/notification/NotificationOverviewScreen";
import NotificationDetailScreen from "@/screens/notification/NotificationDetailScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function NotificationNavigation() {
  return (
    <Stacks.Navigator
      initialRouteName="NotificationOverview"
      screenOptions={{ headerShown: false }}
    >
      <Stacks.Screen
        name="NotificationOverview"
        component={NotificationOverviewScreen}
      />
      <Stacks.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={{ headerShown: true, title: "" }}
      />
    </Stacks.Navigator>
  );
}

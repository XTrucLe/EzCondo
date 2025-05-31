import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import ResidentServicesScreen from "@/screens/service/ResidentServicesScreen";
import ServiceOverviewScreen from "@/screens/service/ServiceOverviewScreen";
import ServicesDetailScreen from "@/screens/service/ServiceDetailScreen";
import ServiceUsingScreen from "@/screens/service/ServiceUsingScreen";
import ServiceSubscriptionScreen from "@/screens/service/ServiceRegistrationScreen";
import ServiceUsingDetailScreen from "@/screens/service/ServiceUsingDetailScreen";
import PaymentNavigation from "./PaymentNavigation";
import ServicesHomeScreen from "@/screens/service/ServiceHomeScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function ServiceNavigation() {
  return (
    <Stacks.Navigator
      initialRouteName="ResidentServices"
      screenOptions={{ headerShown: false }}
    >
      <Stacks.Screen
        name="ResidentServices"
        component={ResidentServicesScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen
        name="ServiceHome"
        component={ServicesHomeScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen
        name="ServiceOverview"
        component={ServiceOverviewScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen
        name="ServiceDetail"
        component={ServicesDetailScreen}
        options={{ headerShown: true, title: "" }}
      />
      <Stacks.Screen
        name="ServiceUsing"
        component={ServiceUsingScreen}
        options={{ headerShown: true, title: "" }}
      />
      <Stacks.Screen
        name="ServiceUsingDetail"
        component={ServiceUsingDetailScreen}
        options={{ headerShown: true, title: "" }}
      />
      <Stacks.Screen
        name="ServiceRegistration"
        component={ServiceSubscriptionScreen}
        options={{ headerShown: true, title: "" }}
      />
      <Stacks.Screen
        name="Payment"
        component={PaymentNavigation}
        options={{ headerShown: false, title: "" }}
      />
    </Stacks.Navigator>
  );
}

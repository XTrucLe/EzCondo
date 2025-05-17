import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
import { useLanguage } from "@/hooks/useLanguage";
import { Stack } from "expo-router";

export default function MeLayout() {
  const { translation } = useLanguage();
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
        options={{
          headerShown: true,
          headerTitle: translation.holderInfo,
          headerRight: () => (
            <HeaderRightIcon
              iconName="pencil"
              navigationScreen="profile_edit"
            />
          ),
        }}
      />
      <Stack.Screen
        name="profile_edit"
        options={{ headerShown: true, headerTitle: translation.goback }}
      />

      <Stack.Screen
        name="payment_waiting"
        options={{ headerShown: true, title: translation.paymentWaiting }}
      />
      <Stack.Screen
        name="payment_history"
        options={{ headerShown: true, title: translation.paymentHistory }}
      />
      <Stack.Screen
        name="payment_detail"
        options={{ headerShown: true, title: translation.paymentDetail }}
      />

      <Stack.Screen name="support" options={{ headerShown: false }} />
      <Stack.Screen
        name="changePassword"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name="paymentQR"
        options={{ headerShown: true, title: "" }}
      />
    </Stack>
  );
}

import HeaderLeftIcon from "@/components/ui/HeaderLeftIcon";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Dịch vụ và tiện ích" }}
      />
      <Stack.Screen name="swimming" options={{ headerShown: true }} />
      <Stack.Screen name="booking" options={{ headerShown: true }} />
      <Stack.Screen
        name="incident"
        options={{
          headerShown: true,
          headerTitle: "Báo cáo sự cố",
          headerLeft: () => (
            <HeaderLeftIcon
              iconName="chevron-back"
              navigationScreen="goBack"
              firstScreen="services"
            />
          ),
        }}
      />
      <Stack.Screen name="apartmentMember" options={{ headerShown: true }} />
      <Stack.Screen name="bill" options={{ headerShown: true }} />
      <Stack.Screen name="detail" options={{ headerShown: true }} />
    </Stack>
  );
}

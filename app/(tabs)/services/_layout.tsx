import HeaderLeftIcon from "@/components/ui/HeaderLeftIcon";
import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
import { Stack } from "expo-router";

export default function ServiceLayout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Dịch vụ và tiện ích",
          headerRight: () => (
            <HeaderRightIcon
              iconName="apps-sharp"
              navigationScreen="listServices"
            />
          ),
        }}
      />
      <Stack.Screen name="listServices" options={{ headerShown: true }} />

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

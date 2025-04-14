import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
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
      <Stack.Screen
        name="parking"
        options={{
          headerShown: true,
          headerRight: () => {
            return (
              <HeaderRightIcon
                iconName="add-card"
                navigationScreen="parking.regis"
                type="material"
              />
            );
          },
        }}
      />
      <Stack.Screen name="parking.regis" options={{ headerShown: true }} />
      <Stack.Screen
        name="chatbot"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="chatbotHome"
        options={{ headerShown: true, headerTitle: "" }}
      />
    </Stack>
  );
}

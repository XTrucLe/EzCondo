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
          headerTitle: "Danh sách thẻ đỗ xe",
        }}
      />
      <Stack.Screen
        name="parking.regis"
        options={{ headerShown: true, headerTitle: "Đăng ký thẻ xe" }}
      />

      <Stack.Screen
        name="booking"
        options={{ headerShown: true, headerTitle: "" }}
      />

      <Stack.Screen
        name="detail"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="booking.confirm"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="apartmentMember"
        options={{ headerShown: true, headerTitle: "" }}
      />

      <Stack.Screen
        name="chatbot"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="chatbotHome"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="seviceFees"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="feeDetail"
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stack.Screen
        name="list_fees"
        options={{ headerShown: true, headerTitle: "" }}
      />
    </Stack>
  );
}

import HomeNavigation from "@/navigation/HomeNavigation";

export default function HomeLayout() {
  return <HomeNavigation />;
}

// import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
// import { useLanguage } from "@/hooks/useLanguage";
// import { Stack } from "expo-router";
//  <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="index" />
//       <Stack.Screen
//         name="incident"
//         options={{
//           headerShown: true,
//           headerTitle: translation.incident,
//         }}
//       />
//       <Stack.Screen
//         name="parking"
//         options={{
//           headerShown: true,
//           headerRight: () => {
//             return (
//               <HeaderRightIcon
//                 iconName="add-card"
//                 navigationScreen="parking.regis"
//                 type="material"
//               />
//             );
//           },
//           headerTitle: translation.parkingCardList,
//         }}
//       />
//       <Stack.Screen
//         name="parking.regis"
//         options={{ headerShown: true, headerTitle: translation.parkingRegis }}
//       />

//       <Stack.Screen
//         name="booking"
//         options={{ headerShown: true, headerTitle: "" }}
//       />

//       <Stack.Screen
//         name="detail"
//         options={{ headerShown: true, headerTitle: "" }}
//       />
//       <Stack.Screen
//         name="booking.confirm"
//         options={{ headerShown: true, headerTitle: "" }}
//       />
//       <Stack.Screen
//         name="apartmentMember"
//         options={{
//           headerShown: true,
//           headerTitle: translation.apartmentMember,
//         }}
//       />

//       <Stack.Screen
//         name="chatbot"
//         options={{
//           headerShown: true,
//           headerTitle: translation.chatbotTitle,
//           headerTitleAlign: "center",
//         }}
//       />
//       <Stack.Screen
//         name="chatbotHome"
//         options={{ headerShown: true, headerTitle: "" }}
//       />
//       <Stack.Screen
//         name="seviceFees"
//         options={{
//           headerShown: true,
//           headerTitle: translation.serviceFees,
//         }}
//       />
//       <Stack.Screen
//         name="feeDetail"
//         options={{
//           headerShown: true,
//           headerTitle: translation.serviceDetail,
//         }}
//       />
//       <Stack.Screen
//         name="paymentQR"
//         options={{ headerShown: true, headerTitle: "" }}
//       />
//       <Stack.Screen
//         name="payment"
//         options={{ headerShown: true, headerTitle: "" }}
//       />
//       <Stack.Screen
//         name="detail_fee"
//         options={{ headerShown: true, headerTitle: translation.fees }}
//       />
//       <Stack.Screen
//         name="bookingDetail"
//         options={{ headerShown: true, headerTitle: "" }}
//       />
//       <Stack.Screen
//         name="support"
//         options={{ headerShown: true, headerTitle: translation.support }}
//       />
//     </Stack>

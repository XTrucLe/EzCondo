import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import BookingScreen from "@/screens/booking/BookingScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function BookingNavigation() {
  return (
    <Stacks.Navigator>
      <Stacks.Screen name="BookingOverview" component={BookingScreen} />
      <Stacks.Screen
        name="BookingDetail"
        component={BookingScreen}
        options={{ headerShown: true, title: "" }}
      />
    </Stacks.Navigator>
  );
}

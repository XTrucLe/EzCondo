import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import HomeScreen from "@/screens";
import PaymentNavigation from "./PaymentNavigation";
import ChatBotNavigation from "./ChatBotNavigation";
import ApartmentMember from "@/screens/apartment/MemberScreen";
import BookingNavigation from "./BookingNavigation";
import ParkingNavigation from "./ParkingNavigation";
import IncidentNavigation from "./IncidentNavigation";
import FeeNavigation from "./FeeNavigation";
import ServiceNavigation from "./ServiceNavigation";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function HomeNavigation() {
  return (
    <Stacks.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen name="Home" component={HomeScreen} />
      <Stacks.Screen
        name="Apartment"
        component={ApartmentMember}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen name="Booking" component={BookingNavigation} />
      <Stacks.Screen name="Chatbot" component={ChatBotNavigation} />
      <Stacks.Screen
        name="Incident"
        component={IncidentNavigation}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen name="Fee" component={FeeNavigation} />
      <Stacks.Screen name="Service" component={ServiceNavigation} />
      <Stacks.Screen name="Parking" component={ParkingNavigation} />
      <Stacks.Screen name="Payment" component={PaymentNavigation} />
    </Stacks.Navigator>
  );
}

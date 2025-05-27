import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import HomeScreen from "@/screens";
import PaymentNavigation from "./PaymentNavigation";
import ChatBotNavigation from "./ChatBotNavigation";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function HomeNavigation() {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen name="Home" component={HomeScreen} />
      <Stacks.Screen name="Payment" component={PaymentNavigation} />
      <Stacks.Screen name="Chatbot" component={ChatBotNavigation} />
    </Stacks.Navigator>
  );
}

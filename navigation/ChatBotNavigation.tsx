import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import ChatbotHome from "@/screens/chatbot/ChatbotHomeScreen";
import ChatbotScreen from "@/screens/chatbot/ChattingScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function ChatBotNavigation() {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen
        name="ChatbotHome"
        component={ChatbotHome}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen
        name="Chatting"
        component={ChatbotScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
    </Stacks.Navigator>
  );
}

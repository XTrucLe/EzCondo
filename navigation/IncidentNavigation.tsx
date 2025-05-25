import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import IncidentCreateScreen from "@/screens/incident/IncidentCreateScreen";
import IncidentHistoryScreen from "@/screens/incident/IncidentHistoryScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function IncidentNavigation() {
  return (
    <Stacks.Navigator>
      <Stacks.Screen
        name="IncidentHistory"
        component={IncidentHistoryScreen}
        options={{
          headerShown: true,
          headerTitle: "Lịch sử sự cố",
        }}
      />
      <Stacks.Screen
        name="IncidentCreate"
        component={IncidentCreateScreen}
        options={{ headerShown: false }}
      />
    </Stacks.Navigator>
  );
}

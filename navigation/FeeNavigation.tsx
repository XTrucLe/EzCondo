import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationType";
import BillListScreen from "@/screens/fee/UlitiesBillSreen";
import BillDetailScreen from "@/screens/fee/UlitiesBillDetailScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();
export default function FeeNavigation() {
  return (
    <Stacks.Navigator screenOptions={{ headerShown: false }}>
      <Stacks.Screen
        name="FeeOverview"
        component={BillListScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
      <Stacks.Screen
        name="FeeDetail"
        component={BillDetailScreen}
        options={{ headerShown: true, headerTitle: "" }}
      />
    </Stacks.Navigator>
  );
}

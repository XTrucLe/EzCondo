import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
import { useLanguage } from "@/hooks/useLanguage";
import { ParkingOverview } from "@/screens/parking/ParkingOverview";
import { ParkingRegistrationScreen } from "@/screens/parking/ParkingRegistrationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stacks = createNativeStackNavigator();

export default function ParkingNavigation() {
  const { translation } = useLanguage();
  return (
    <Stacks.Navigator>
      <Stacks.Screen
        name="ParkingOverview"
        component={ParkingOverview}
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
          headerTitle: translation.parkingCardList,
        }}
      />
      <Stacks.Screen
        name="ParkingRegistration"
        component={ParkingRegistrationScreen}
        options={{ headerShown: false }}
      />
    </Stacks.Navigator>
  );
}

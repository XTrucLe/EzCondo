import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "@/screens/profile/ProfileScreen";
import { RootStackParamList } from "./NavigationType";
import HeaderRightIcon from "@/components/ui/HeaderRightIcon";
import { useLanguage } from "@/hooks/useLanguage";
import EditProfileScreen from "@/screens/profile/ProfileEditScreen";

const Stacks = createNativeStackNavigator<RootStackParamList>();

export default function ProfileNavigation() {
  const { translation } = useLanguage();
  return (
    <Stacks.Navigator>
      <Stacks.Screen
        name="ProfileOverview"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: translation.holderInfo,
          headerRight: () => (
            <HeaderRightIcon iconName="pencil" navigationScreen="ProfileEdit" />
          ),
        }}
      />
      <Stacks.Screen
        name="ProfileEdit"
        component={EditProfileScreen} // Assuming ProfileScreen can handle editing as well
        options={{
          headerShown: true,
          headerTitle: translation.goback,
        }}
      />
    </Stacks.Navigator>
  );
}

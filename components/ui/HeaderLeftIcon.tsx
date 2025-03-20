import { TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

type HeaderLeftIconProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  navigationScreen: string;
  firstScreen?: string;
};
const HeaderLeftIcon = ({
  iconName,
  navigationScreen,
  firstScreen,
}: HeaderLeftIconProps) => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    if (navigationScreen == "goBack") {
      navigation.canGoBack()
        ? navigation.goBack()
        : navigation.navigate(firstScreen as never);
    } else {
      navigation.navigate(navigationScreen as never);
    }
  };
  return (
    <TouchableOpacity>
      <Ionicons
        name={iconName}
        size={24}
        color="#000000"
        onPress={handleOnPress}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeftIcon;

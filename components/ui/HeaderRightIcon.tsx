import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

type HeaderRightIconProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  navigationScreen: string;
};
const HeaderRightIcon = ({
  iconName,
  navigationScreen,
}: HeaderRightIconProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationScreen as never);
      }}
      style={{ marginRight: 16 }}
    >
      <Ionicons name={iconName} size={24} color="#000000" />
    </TouchableOpacity>
  );
};

export default HeaderRightIcon;

import { getMyParkingDetails } from "@/services/parkingService";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";

type HeaderRightIconProps = {
  text?: string;
  iconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialIcons.glyphMap;
  navigationScreen: string;
  type?: "default" | "material";
};
const HeaderRightIcon = ({
  type,
  text,
  iconName,
  navigationScreen,
}: HeaderRightIconProps) => {
  const navigation = useNavigation();
  const IconMap = {
    default: Ionicons,
    material: MaterialIcons,
  };

  const renderIcon = () => {
    const IconComponent = IconMap[type || "default"] as React.ComponentType<{
      name:
        | keyof typeof Ionicons.glyphMap
        | keyof typeof MaterialIcons.glyphMap;
      size: number;
      color: string;
    }>;
    return <IconComponent name={iconName} size={24} color="#000000" />;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigationScreen as never)}
      style={{ marginRight: 16 }}
    >
      {text && <Text style={{ marginRight: 8 }}>{text}</Text>}
      {renderIcon()}
    </TouchableOpacity>
  );
};

export default HeaderRightIcon;

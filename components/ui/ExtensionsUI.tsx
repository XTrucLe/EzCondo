import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { useNavigation } from "expo-router";
import { request } from "@/services/apiService";
import { getServiceDetail } from "@/services/servicesService";

const utilitiesList = [
  { id: "1", name: "Bãi đậu xe", icon: "car", navigatePage: "parking" },
  { id: "2", name: "Điện - Nước", icon: "flash", navigatePage: "seviceFees" },
  {
    id: "3",
    name: "Thành viên",
    icon: "person",
    navigatePage: "apartmentMember",
  },
];

const servicesList = [
  { id: "swim", name: "Hồ bơi", icon: "walk", navigatePage: "detail" },
  { id: "5", name: "Phòng Gym", icon: "barbell", navigatePage: "defaultPage" },
  {
    id: "6",
    name: "Báo cáo sự cố",
    icon: "alert-circle",
    navigatePage: "incident",
  },
  {
    id: "7",
    name: "Thanh toán dịch vụ",
    icon: "cash",
    navigatePage: "defaultPage",
  },
  {
    id: "8",
    name: "Thông báo",
    icon: "notifications",
    navigatePage: "defaultPage",
  },
  { id: "9", name: "Hỗ trợ", icon: "help-circle", navigatePage: "members" },
];

interface UtilityItemProps {
  id: string;
  name: string;
  icon: any;
  navigatePage?: string;
}

const UtilityItem: React.FC<UtilityItemProps> = ({
  id,
  name,
  icon,
  navigatePage,
}) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "cardBackground");
  const iconColor = useThemeColor({}, "icon");
  const navigation = useNavigation<any>();

  const handleCheckServiceDetail = async () => {
    try {
      const [res1, res2] = await Promise.all([
        getServiceDetail(id.toLowerCase()),
        getServiceDetail(name.toLowerCase()),
      ]);
      return res1?.length ? res1 : res2;
    } catch (error) {
      console.error("Error fetching service detail:", error);
      return null;
    }
  };

  const handleNavigate = async () => {
    if (!navigatePage) return;

    if (id.toLowerCase().includes("swim")) {
      const response = await handleCheckServiceDetail();
      if (!response || !response.length) {
        alert("Coming soon");
        return;
      }
      navigation.navigate("detail", { name, data: response });
    } else {
      navigation.navigate(navigatePage);
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handleNavigate}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <Ionicons name={icon} size={30} color={iconColor} />
      </View>
      <Text style={[styles.text, { color: textColor }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const renderUtilityGrid = (data: UtilityItemProps[], noRow = 1) => (
  <View style={styles.gridContainer}>
    {[0, 1].map((row) => (
      <View key={row} style={styles.row}>
        {data
          .filter((_, index) => index % noRow === row)
          .map((item) => (
            <UtilityItem key={item.id} {...item} />
          ))}
      </View>
    ))}
  </View>
);

const ExtensionsUI = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Tiện ích</ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        {renderUtilityGrid(utilitiesList)}
      </ScrollView>

      <ThemedText type="subtitle">Dịch vụ</ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        {renderUtilityGrid(servicesList, 2)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  scrollStyle: {
    flex: 1,
    minWidth: "100%",
    justifyContent: "center",
  },
  gridContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  item: {
    width: 80,
    height: 130,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ExtensionsUI;

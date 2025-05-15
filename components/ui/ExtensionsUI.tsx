import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { getServiceDetail } from "@/services/servicesService";

type UtilityItemProps = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  navigatePage?: string;
};

const utilitiesList: UtilityItemProps[] = [
  { id: "1", name: "Bãi đậu xe", icon: "car", navigatePage: "parking" },
  { id: "2", name: "Điện - Nước", icon: "flash", navigatePage: "seviceFees" },
  {
    id: "3",
    name: "Thành viên",
    icon: "person",
    navigatePage: "apartmentMember",
  },
];

const servicesList: UtilityItemProps[] = [
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
    navigatePage: "list_fees",
  },
  {
    id: "8",
    name: "Thông báo",
    icon: "notifications",
    navigatePage: "defaultPage",
  },
  { id: "9", name: "Hỗ trợ", icon: "help-circle", navigatePage: "members" },
];

const UtilityItem: React.FC<UtilityItemProps> = ({
  id,
  name,
  icon,
  navigatePage,
}) => {
  const navigation = useNavigation<any>();

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "cardBackground");
  const iconColor = useThemeColor({}, "icon");

  const fetchServiceDetail = async () => {
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
      const data = await fetchServiceDetail();
      if (!data?.length) {
        alert("Coming soon");
        return;
      }
      navigation.navigate("detail", { name, data });
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

const renderGrid = (data: UtilityItemProps[], column = 2) => {
  const rows = Array.from({ length: column }, (_, rowIndex) =>
    data.filter((_, index) => index % column === rowIndex)
  );

  return (
    <View style={styles.gridContainer}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item) => (
            <UtilityItem key={item.id} {...item} />
          ))}
        </View>
      ))}
    </View>
  );
};

const ExtensionsUI: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle"></ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        {renderGrid(utilitiesList, 1)}
      </ScrollView>

      <ThemedText type="subtitle">Dịch vụ</ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        {renderGrid(servicesList, 2)}
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

import React, { ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { getServiceDetail } from "@/services/servicesService";

const iconSize = 30;
const iconColor = "#3674B5"; // Màu sắc cho icon

type UtilityItemProps = {
  id: string;
  name: string;
  icon: ReactNode; // icon là component React
  navigatePage?: string | object;
};

const utilitiesList: UtilityItemProps[] = [
  {
    id: "1",
    name: "Bãi đậu xe",
    icon: <Ionicons name="car" size={iconSize} color={iconColor} />,
    navigatePage: "parking",
  },
  {
    id: "2",
    name: "Điện",
    icon: <Ionicons name="flash" size={iconSize} color={iconColor} />,
    navigatePage: "seviceFees",
  },
  {
    id: "3",
    name: "Nước",
    icon: <Ionicons name="water" size={iconSize} color={iconColor} />,
    navigatePage: "water",
  },
  {
    id: "4",
    name: "Thành viên",
    icon: <Ionicons name="person" size={iconSize} color={iconColor} />,
    navigatePage: "apartmentMember",
  },
];

const servicesList: UtilityItemProps[] = [
  {
    id: "swim",
    name: "Hồ bơi",
    icon: (
      <FontAwesome6 name="person-swimming" size={iconSize} color={iconColor} />
    ),
    navigatePage: "pool",
  },
  {
    id: "13",
    name: "Phòng xông hơi",
    icon: <FontAwesome5 name="hot-tub" size={iconSize} color={iconColor} />,
    navigatePage: "steamRoom",
  },
  {
    id: "5",
    name: "Phòng Gym",
    icon: <Ionicons name="barbell" size={iconSize} color={iconColor} />,
    navigatePage: "fitnessCenter",
  },
  {
    id: "11",
    name: "Khu vui chơi trẻ em",
    icon: <Ionicons name="play-circle" size={iconSize} color={iconColor} />,
    navigatePage: "childrenPlayground",
  },
  {
    id: "12",
    name: "Giặt ủi",
    icon: <Ionicons name="shirt-outline" size={iconSize} color={iconColor} />,
    navigatePage: "laundry",
  },
  {
    id: "6",
    name: "Báo cáo sự cố",
    icon: <Ionicons name="alert-circle" size={iconSize} color={iconColor} />,
    navigatePage: "incident",
  },
  {
    id: "7",
    name: "Thanh toán dịch vụ",
    icon: <Ionicons name="cash" size={iconSize} color={iconColor} />,
    navigatePage: "list_fees",
  },
  {
    id: "support",
    name: "Hỗ trợ",
    icon: <Ionicons name="help-circle" size={iconSize} color={iconColor} />,
    navigatePage: "support",
  },
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
    } else if (navigatePage == "water") {
      navigation.navigate("seviceFees", { mode: "water" });
    } else {
      navigation.navigate(navigatePage);
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handleNavigate}>
      <View style={[styles.iconContainer, { backgroundColor }]}>{icon}</View>
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

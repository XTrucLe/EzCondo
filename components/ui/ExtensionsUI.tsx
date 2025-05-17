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

const SERVICE_COLORS = [
  "#75B4F3", // Mid Blue
  "#FF8888", // Mid Coral
  "#72DAD4", // Mid Turquoise
  "#FFC04D", // Mid Orange
  "#BB8FCE", // Mid Purple
  "#EF736B", // Mid Red
  "#7DDC84", // Mid Green
  "#7FBCE9", // Mid Light Blue
];

// Constants
const ICON_SIZE = 36;
const ITEM_SIZE = 100;
const ICON_COLOR = "#3674B5";
const GRID_COLUMNS = {
  UTILITIES: 1,
  SERVICES: 2,
};

type UtilityItemProps = {
  id: string;
  name: string;
  icon: ReactNode;
  navigatePage?: string | object;
  color?: string;
};

// Danh sách tiện ích hệ thống
const UTILITIES_LIST: UtilityItemProps[] = [
  {
    id: "1",
    name: "Bãi đậu xe",
    icon: <Ionicons name="car" size={ICON_SIZE} color="white" />,
    navigatePage: "parking",
    color: "#FFA94D", // Vibrant orange
  },
  {
    id: "2",
    name: "Điện",
    icon: <Ionicons name="flash" size={ICON_SIZE} color="white" />,
    navigatePage: "serviceFees",
    color: "#FECA57", // Bright yellow
  },
  {
    id: "3",
    name: "Nước",
    icon: <Ionicons name="water" size={ICON_SIZE} color="white" />,
    navigatePage: "water",
    color: "#54A0FF", // Sky blue
  },
  {
    id: "4",
    name: "Thành viên",
    icon: <Ionicons name="person" size={ICON_SIZE} color="white" />,
    navigatePage: "apartmentMember",
    color: "#5F27CD", // Royal purple
  },
];

const SERVICES_LIST: UtilityItemProps[] = [
  {
    id: "Pool",
    name: "Hồ bơi",
    icon: (
      <FontAwesome6 name="person-swimming" size={ICON_SIZE} color="white" />
    ),
    navigatePage: "pool",
    color: SERVICE_COLORS[0],
  },
  {
    id: "Steam room",
    name: "Phòng xông hơi",
    icon: <FontAwesome5 name="hot-tub" size={ICON_SIZE} color="white" />,
    navigatePage: "steamRoom",
    color: SERVICE_COLORS[1],
  },
  {
    id: "Fitness",
    name: "Phòng Gym",
    icon: <Ionicons name="barbell" size={ICON_SIZE} color="white" />,
    navigatePage: "fitnessCenter",
    color: SERVICE_COLORS[2],
  },
  {
    id: "Children",
    name: "Khu vui chơi trẻ em",
    icon: <FontAwesome6 name="children" size={ICON_SIZE} color="white" />,
    navigatePage: "childrenPlayground",
    color: SERVICE_COLORS[3],
  },
  {
    id: "Laundry",
    name: "Giặt ủi",
    icon: <Ionicons name="shirt-outline" size={ICON_SIZE} color="white" />,
    navigatePage: "laundry",
    color: SERVICE_COLORS[4],
  },
  {
    id: "5",
    name: "Báo cáo sự cố",
    icon: <Ionicons name="alert-circle" size={ICON_SIZE} color="white" />,
    navigatePage: "incident",
    color: SERVICE_COLORS[5],
  },
  {
    id: "payment",
    name: "Thanh toán",
    icon: <Ionicons name="cash" size={ICON_SIZE} color="white" />,
    navigatePage: "list_fees",
    color: SERVICE_COLORS[6],
  },
  {
    id: "support",
    name: "Hỗ trợ",
    icon: <Ionicons name="help-circle" size={ICON_SIZE} color="white" />,
    navigatePage: "support",
    color: SERVICE_COLORS[7],
  },
];

const UtilityItem: React.FC<UtilityItemProps> = ({
  id,
  name,
  icon,
  navigatePage,
  color,
}) => {
  const navigation = useNavigation<any>();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "cardBackground");

  const handlePress = () => {
    if (!navigatePage) return;

    if (navigatePage === "water") {
      navigation.navigate("seviceFees", { mode: "water" });
      return;
    }

    if (!/\d/.test(id)) {
      navigation.navigate("detail", { name: id });
      return;
    }

    if (typeof navigatePage === "string") {
      navigation.navigate(navigatePage);
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: color || backgroundColor },
        ]}
      >
        {icon}
      </View>
      <Text style={[styles.text, { color: textColor }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const GridView: React.FC<{ data: UtilityItemProps[]; columns: number }> = ({
  data,
  columns,
}) => {
  const rows = Array.from({ length: columns }, (_, rowIndex) =>
    data.filter((_, index) => index % columns === rowIndex)
  );

  return (
    <View style={styles.gridContainer}>
      {rows.map((row, index) => (
        <View key={`row-${index}`} style={styles.row}>
          {row.map((item) => (
            <UtilityItem key={`item-${item.id}`} {...item} />
          ))}
        </View>
      ))}
    </View>
  );
};

const HorizontalScrollGrid: React.FC<{
  data: UtilityItemProps[];
  columns: number;
}> = ({ data, columns }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scrollStyle}
  >
    <GridView data={data} columns={columns} />
  </ScrollView>
);

const ExtensionsUI: React.FC = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Tiện ích</ThemedText>
      <HorizontalScrollGrid
        data={UTILITIES_LIST}
        columns={GRID_COLUMNS.UTILITIES}
      />

      <ThemedText type="subtitle">Dịch vụ</ThemedText>
      <HorizontalScrollGrid
        data={SERVICES_LIST}
        columns={GRID_COLUMNS.SERVICES}
      />
    </View>
  );
};

// Styles
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

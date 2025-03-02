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

const utilities = [
  { id: "1", name: "Bãi đậu xe", icon: "car" }, // Quản lý đăng ký chỗ đỗ xe
  { id: "2", name: "Điện - Nước", icon: "flash" }, // Xem và thanh toán hóa đơn điện, nước
  { id: "3", name: "Hồ bơi", icon: "walk" }, // Đặt lịch sử dụng hồ bơi
  { id: "4", name: "Phòng Gym", icon: "barbell" }, // Đặt lịch và sử dụng phòng tập gym
  { id: "5", name: "Báo cáo sự cố", icon: "alert-circle" }, // Gửi yêu cầu sửa chữa, báo cáo sự cố
  { id: "6", name: "Thanh toán dịch vụ", icon: "cash" }, // Thanh toán các khoản phí chung cư
  { id: "7", name: "Thông báo", icon: "notifications" }, // Nhận thông báo từ ban quản lý
  { id: "8", name: "Hỗ trợ", icon: "help-circle" }, // Liên hệ ban quản lý để được hỗ trợ
];

interface UtilityItemProps {
  name: string;
  icon: any;
}

const UtilityItem: React.FC<UtilityItemProps> = ({ name, icon }) => {
  const theme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "cardBackground");
  const iconColor = useThemeColor({}, "icon");

  return (
    <TouchableOpacity style={styles.item}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <Ionicons name={icon} size={30} color={iconColor} />
      </View>
      <Text style={[styles.text, { color: textColor }]}>{name}</Text>
    </TouchableOpacity>
  );
};

const ExtensionsUI = () => {
  const itemSize = 100;
  const theme = useColorScheme();
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Tiện ích và dịch vụ</ThemedText>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollStyle}
      >
        <View style={styles.gridContainer}>
          {[0, 1].map((row) => (
            <View key={row} style={styles.row}>
              {utilities
                .filter((_, index) => index % 2 === row)
                .map((item) => (
                  <UtilityItem
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                  />
                ))}
            </View>
          ))}
        </View>
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
    marginBottom: 8,
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

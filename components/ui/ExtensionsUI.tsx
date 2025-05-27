import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { useLanguage } from "@/hooks/useLanguage";
import {
  ICON_SIZE,
  COLORS,
  UTILITIES_LIST,
  SERVICES_LIST,
} from "@/constants/HomeUtility";

const UtilityItem = ({ id, name, icon, page, color }: any) => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "cardBackground");

  const handlePress = () => {
    if (!page) return;
    if (page === "water")
      return navigation.navigate("seviceFees", { mode: "water" });
    if (!/\d/.test(id)) return navigation.navigate("detail", { name: id });
    navigation.navigate(page);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <View style={[styles.iconBox, { backgroundColor: color || bgColor }]}>
        {icon || <Ionicons name={icon} size={ICON_SIZE} color="#fff" />}
      </View>
      <Text
        style={[styles.text, { color: textColor }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {translation[name]}
      </Text>
    </TouchableOpacity>
  );
};

const GridView = ({ data, columns }: { data: any[]; columns: number }) => {
  const rows = Array.from({ length: columns }, (_, i) =>
    data.filter((_, j) => j % columns === i)
  );
  return (
    <View style={styles.grid}>
      {rows.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((item) => (
            <UtilityItem key={item.id} {...item} />
          ))}
        </View>
      ))}
    </View>
  );
};

const HorizontalScrollGrid = ({ data, columns }: any) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.scroll}
  >
    <GridView data={data} columns={columns} />
  </ScrollView>
);

const ExtensionsUI = () => {
  const { translation } = useLanguage();

  const UtilityCard = ({ item }: { item: any }) => {
    const navigation = useNavigation<any>();
    const handlePress = () => {
      if (!item.page) return;
      if (item.page === "water")
        return navigation.navigate("seviceFees", { mode: "water" });
      if (!/\d/.test(item.id))
        return navigation.navigate("detail", { name: item.id });
      navigation.navigate(item.page);
    };
    return (
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <View style={styles.iconSmall}>{item.icon}</View>
        <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
          {translation[item.name]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" />
      <FlatList
        data={UTILITIES_LIST.map((u) => ({
          ...u,
          icon: (
            <Ionicons name={u.icon as any} size={ICON_SIZE} color={u.color} />
          ),
        }))}
        numColumns={4}
        renderItem={({ item }) => <UtilityCard item={item} />}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.flatlistContent}
      />

      <ThemedText type="subtitle">{translation.service}</ThemedText>
      <HorizontalScrollGrid
        data={SERVICES_LIST.map((s, i) => ({
          ...s,
          color: COLORS.services[i],
        }))}
        columns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", zIndex: 1 },
  scroll: { minWidth: "100%", justifyContent: "center" },
  grid: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { marginTop: 6, fontSize: 14, fontWeight: "500", textAlign: "center" },
  card: {
    width: "24%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    paddingTop: 8,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  iconSmall: {
    width: 48,
    height: 48,
    left: 4,
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  label: {
    flex: 1,
    textAlign: "center",
    maxWidth: 100,
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
  },
  columnWrap: { justifyContent: "space-between", marginBottom: 16 },
  flatlistContent: { paddingTop: 8, width: "100%" },
});

export default ExtensionsUI;

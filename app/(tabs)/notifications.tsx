import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const NotificationsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>📢 Thông báo</Text>
  </View>
);

const FeesScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>💰 Phí</Text>
  </View>
);

const NewsScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
    }}
  >
    <Text>📰 Tin tức</Text>
  </View>
);
interface Route {
  key: string;
  title: string;
}

interface NavigationState {
  index: number;
  routes: Route[];
}

const CustomTabBar = ({
  navigationState,
  position,
  setIndex,
}: {
  navigationState: NavigationState;
  position: Animated.Value;
  setIndex: any;
}) => {
  const inputRange = useMemo(
    () => navigationState.routes.map((_, i) => i),
    [navigationState.routes]
  );
  const activeColor = useThemeColor({}, "bottomTabActive");
  const layout = useWindowDimensions();
  const tabWidth = layout.width / navigationState.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: navigationState.index * tabWidth * 0.9,
      useNativeDriver: true,
      speed: 10,
      bounciness: 10,
    }).start();
  }, [navigationState.index]);

  return (
    <View style={styles.tabContainer}>
      {/* Vòng tròn active di chuyển qua lại */}
      <Animated.View
        style={[
          styles.activeCircle,
          { transform: [{ translateX }], backgroundColor: activeColor },
        ]}
      />
      {navigationState.routes.map((route, index) => {
        const activeOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.3)), // Fix lỗi opacity
        });

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => {
              setIndex(index);
            }}
          >
            <Animated.View style={[styles.item, { opacity: activeOpacity }]}>
              <Ionicons name="document" size={24} style={styles.active} />
              <Text style={[styles.label, styles.active]}>{route.title}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function TabViewScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "notifications", title: "Thông báo" },
    { key: "fees", title: "Phí" },
    { key: "news", title: "Tin tức" },
  ]);
  const position = new Animated.Value(index);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        notifications: NotificationsScreen,
        fees: FeesScreen,
        news: NewsScreen,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <CustomTabBar {...props} position={position} setIndex={setIndex} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    overflow: "hidden",
    height: 50,
  },
  activeCircle: {
    position: "absolute",
    width: "33.33%",
    height: "100%",
    borderRadius: 9,
    zIndex: -1,
  },
  tab: { flex: 1 },
  item: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  label: { fontSize: 16, marginLeft: 5 },
  active: { color: "black" },
});

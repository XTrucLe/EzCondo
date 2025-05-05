import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface CustomTabBarProps {
  navigationState: { index: number; routes: { key: string; title: string }[] };
  setIndex: (index: number) => void;
  activeColor: string;
  inactiveColor: string;
}

const CustomTabBar: React.FC<CustomTabBarProps> = React.memo(
  ({ navigationState, setIndex, activeColor, inactiveColor }) => {
    const layout = useWindowDimensions();
    const translateX = useRef(new Animated.Value(0)).current;

    const tabWidth = useMemo(() => {
      const width = (layout.width * 0.9) / navigationState.routes.length;
      return width > 0 ? width : 0;
    }, [layout.width, navigationState.routes.length]);

    // Create interpolated values for text and icon colors
    const textColors = useMemo(() => {
      return navigationState.routes.map((_, i) => {
        return translateX.interpolate({
          inputRange: navigationState.routes.map((_, idx) => idx * tabWidth),
          outputRange: navigationState.routes.map((_, idx) =>
            idx === i ? activeColor : inactiveColor
          ),
        });
      });
    }, [navigationState.routes, translateX, tabWidth, inactiveColor]);

    useEffect(() => {
      Animated.spring(translateX, {
        toValue: navigationState.index * tabWidth,
        useNativeDriver: false,
        speed: 10,
        bounciness: 10,
      }).start();
    }, [navigationState.index, tabWidth, translateX]);

    const ICONS: Record<string, string> = {
      notifications: "notifications",
      fees: "cash",
      news: "newspaper",
    };

    return (
      <View style={styles.tabContainer}>
        {/* Active Indicator nằm dưới */}
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                transform: [{ translateX }],
                width: tabWidth,
              },
            ]}
          >
            {/* Lớp nền mờ */}
            <View
              style={[
                styles.indicatorOverlay,
                { backgroundColor: activeColor },
              ]}
            />
          </Animated.View>
        </View>

        {/* Các Tab */}
        {navigationState.routes.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => setIndex(index)}
            activeOpacity={0.7}
          >
            <View style={styles.tabItem}>
              <Animated.View style={styles.tabContent}>
                <Ionicons
                  name={
                    (ICONS[route.key] ||
                      "document") as keyof typeof Ionicons.glyphMap
                  }
                  size={20}
                  color={`${textColors[index]}`}
                  style={{ zIndex: 2 }}
                />
                <Animated.Text
                  style={[
                    styles.tabLabel,
                    {
                      color: textColors[index],
                      fontWeight:
                        navigationState.index === index ? "600" : "400",
                    },
                  ]}
                >
                  {route.title}
                </Animated.Text>
              </Animated.View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    height: 48,
    marginVertical: 12,
    backgroundColor: "#f8f9fa",
  },
  activeIndicator: {
    position: "absolute",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden", // để lớp overlay không tràn ra ngoài
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1, // thấp hơn icon/text
  },

  indicatorOverlay: {
    flex: 1,
    opacity: 0.5, // Mờ nền thôi, không làm mờ toàn bộ view
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  tabLabel: {
    fontSize: 14,
    marginLeft: 6,
    includeFontPadding: false,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    zIndex: 2,
  },
});
export default CustomTabBar;

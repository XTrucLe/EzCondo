import ExtensionsUI from "@/components/ui/ExtensionsUI";
import { SlideShow } from "@/components/ui/SlideShow";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_HEADER_HEIGHT = 200;
const MIN_HEADER_HEIGHT = 60;

const Header = ({
  title,
  onMenuPress,
  scrollY,
}: {
  title: string;
  onMenuPress: () => void;
  scrollY: Animated.Value;
}) => {
  const theme = useColorScheme();
  const backgroundColor = theme === "dark" ? "#222" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";

  // Header thu nhỏ theo scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[styles.header, { height: headerHeight, backgroundColor }]}
    >
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color={textColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const color = useThemeColor({ light: "black", dark: "white" }, "background");
  const textTime = isLightTime(new Date().getHours()) ? "sáng! 🌞" : "tối! 🌙";
  const scrollY = useRef(new Animated.Value(0)).current;
  const route = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color }}>
      <View style={styles.headerContainer}>
        {/* Header cố định */}
        <Header
          title="Hsome"
          onMenuPress={() => {
            route.navigate("/login");
          }}
          scrollY={scrollY}
        />
      </View>

      {/* Nội dung cuộn */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: MAX_HEADER_HEIGHT,
          position: "relative",
        }}
        stickyHeaderIndices={[0]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Header luôn cố định trên màn hình */}
        <Text style={{ marginLeft: 10 }}>Chào buổi {textTime}</Text>
        <ExtensionsUI />
        <SlideShow />
        <SlideShow />
        <SlideShow />
        <SlideShow />
        <SlideShow />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const isLightTime = (hour: number) => hour >= 6 && hour < 18;

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    flex: 1,
    marginBottom: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  smallTitleContainer: {
    position: "absolute",
    top: 20,
    left: 60,
    zIndex: 20,
  },
  smallTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

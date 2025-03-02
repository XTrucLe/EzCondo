import ExtensionsUI from "@/components/ui/ExtensionsUI";
import { SlideShow } from "@/components/ui/SlideShow";
import { userInformation } from "@/constants/BackgroundImage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_HEADER_HEIGHT = 200;
const MIN_HEADER_HEIGHT = 130;

const Header = ({
  onImagePress,
  scrollY,
}: {
  onImagePress: () => void;
  scrollY: Animated.Value;
}) => {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor({}, "header");
  const textColor = useThemeColor({}, "text");
  const textTime = isLightTime(new Date().getHours()) ? "sáng! 🌞" : "tối! 🌙";
  const wellcomeTextColor = theme == "light" ? "#FF9800" : "#121212";
  // Header thu nhỏ theo scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const panelTranslateY = scrollY.interpolate({
    inputRange: [0, 100], // Khi scroll từ 0 -> 100px
    outputRange: [0, 0], // Panel di chuyển lên 50px
    extrapolate: "clamp",
  });

  const userInfoTranslateY = scrollY.interpolate({
    inputRange: [0, 90], // Scroll từ 0 -> 200px
    outputRange: [0, -50], // Di chuyển tối đa 100px lên trên
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[styles.header, { height: headerHeight, backgroundColor }]}
    >
      <Text style={[styles.wellcomeText, { color: wellcomeTextColor }]}>
        Chào buổi {textTime}
      </Text>
      <Animated.View
        style={[
          styles.userInfoContainer,
          { transform: [{ translateY: userInfoTranslateY }] },
        ]}
      >
        <TouchableOpacity
          onPress={onImagePress}
          style={styles.userImageContainer}
        >
          <Image source={userInformation.image} style={styles.userImage} />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: textColor }]}>
            {userInformation.name}
          </Text>
          <Text style={[styles.apartment, { color: textColor }]}>
            Căn hộ: {userInformation.apartment_number}
          </Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.paymentPanel,
          { transform: [{ translateY: panelTranslateY }] },
        ]}
      >
        <PaymentPanel serviceAmount={250000} walletBalance={500000} />
      </Animated.View>
    </Animated.View>
  );
};

const PaymentPanel = ({
  serviceAmount,
  walletBalance,
}: {
  serviceAmount: number;
  walletBalance: number;
}) => {
  const panelBgColor = useThemeColor({}, "panelBackground");

  return (
    <View style={[styles.panel, { backgroundColor: panelBgColor }]}>
      <View style={styles.section}>
        <Text style={styles.label}>Cần thanh toán</Text>
        <Text style={styles.amount}>{serviceAmount.toLocaleString()} vnđ</Text>
      </View>
      <View
        style={[
          styles.section,
          { borderLeftWidth: 1, borderLeftColor: "#ddd" },
        ]}
      >
        <Text style={styles.label}>Số dư ví</Text>
        <Text style={styles.amount}>{walletBalance.toLocaleString()} vnđ</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const bgColor = useThemeColor({}, "background");
  const scrollY = useRef(new Animated.Value(0)).current;
  const route = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.headerContainer}>
        <Header
          onImagePress={() => {
            route.navigate("/login");
          }}
          scrollY={scrollY}
        />
      </View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: MAX_HEADER_HEIGHT,
          position: "relative",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
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
  wellcomeText: {
    position: "absolute",
    top: 20,
    right: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  userInfoContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userImageContainer: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    position: "absolute",
    left: 70,
    top: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  apartment: {
    fontSize: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  paymentPanel: {
    position: "absolute",
    bottom: -30, // Lúc đầu hơi chìa ra
    left: 0,
    right: 0,
    alignItems: "center",
  },
  panel: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    height: 80,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    zIndex: 10,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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

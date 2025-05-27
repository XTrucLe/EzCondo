import ExtensionsUI from "@/components/ui/ExtensionsUI";
import { SlideShow } from "@/components/ui/SlideShow";
import { useLanguage } from "@/hooks/useLanguage";
import useAuthStore from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeHeaderImage, userDefaultImage } from "@/constants/ImageLink";

const MAX_HEADER_HEIGHT = 180;

type UserHomeProps = {
  fullName: string;
  apartmentNumber?: string;
  image?: string;
};

const Header = ({ onImagePress }: { onImagePress: () => void }) => {
  const theme = useColorScheme();
  const { user } = useAuthStore();
  const { translation } = useLanguage();

  const textTime = isLightTime(new Date().getHours())
    ? `${translation.goodMorning}! 🌅`
    : `${translation.goodEvening}! 🌙`;

  const [userInfo, setUserInfo] = useState<UserHomeProps>({
    fullName: "Người dùng",
    apartmentNumber: "Chưa cập nhật",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setUserInfo({
        fullName: user?.fullName || "Người dùng",
        apartmentNumber: user?.apartmentNumber || "Chưa cập nhật",
        image: user?.avatar || "",
      });
    };
    fetchUserInfo();
  }, [user]);

  return (
    <View style={styles.header}>
      <ImageBackground
        source={homeHeaderImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient overlay để làm mờ nền */}
        <View style={styles.overlay} />

        <Text style={styles.greeting}>{textTime}</Text>

        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={onImagePress}>
            <Image
              source={
                userInfo.image ? { uri: userInfo.image } : userDefaultImage
              }
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.fullName}>{userInfo.fullName}</Text>
            <Text style={styles.apartment}>
              {translation.apartment}: {userInfo.apartmentNumber}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default function HomeScreen() {
  const bgColor = useThemeColor({}, "background");
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Header
            onImagePress={() =>
              navigation.navigate("me", { screen: "profile" })
            }
          />
        </View>

        <View
          style={[
            styles.content,
            { backgroundColor: bgColor, paddingBottom: 20 },
          ]}
        >
          <ExtensionsUI />
          <SlideShow item={[]} />
        </View>

        <View style={{ height: 50 }}></View>
      </ScrollView>
      <FAB
        icon="plus"
        label="Chat"
        style={styles.fab}
        onPress={() => navigation.navigate("chatbotHome")}
      />
    </SafeAreaView>
  );
}

const isLightTime = (hour: number) => hour >= 6 && hour < 18;

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    flex: 1,
  },
  header: {
    height: 240,
    width: "100%",
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  greeting: {
    fontSize: 18,
    alignSelf: "flex-end",
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    backgroundColor: "#eee",
  },
  infoCard: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    backdropFilter: "blur(10px)", // Sẽ bị bỏ qua trên Android nhưng giữ lại cảm giác glass.
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  apartment: {
    fontSize: 14,
    color: "#eee",
    marginTop: 4,
  },
  userInfo: {
    position: "absolute",
    left: 70,
    top: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#34C759",
  },
});

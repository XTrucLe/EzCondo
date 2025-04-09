import NotificationBox from "@/components/ui/notification/NotificationBox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getNotification } from "@/services/notificationService";
import {
  fakeNotification,
  NotificationBoxType,
} from "@/utils/type/notificationBoxType";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

type dataProps = {
  data: NotificationBoxType[];
};

const NotificationsScreen = ({ data }: dataProps) => (
  <ScrollView style={styles.screen}>
    {data.map((item) => (
      <NotificationBox key={item.id} {...item} />
    ))}
  </ScrollView>
);

const FeesScreen = ({ data }: dataProps) => (
  <ScrollView style={styles.screen}>
    {data.map((item) => (
      <NotificationBox key={item.id} {...item} />
    ))}
  </ScrollView>
);

const NewsScreen = ({ data }: dataProps) => (
  <ScrollView style={styles.screen}>
    {data.map((item) => (
      <NotificationBox key={item.id} {...item} />
    ))}
  </ScrollView>
);

const CustomTabBar = React.memo(({ navigationState, setIndex }: any) => {
  const layout = useWindowDimensions();
  const activeColor = useThemeColor({}, "bottomTabActive");
  const translateX = useRef(new Animated.Value(0)).current;

  const tabWidth = useMemo(() => {
    const width = (layout.width * 0.9) / navigationState.routes.length;
    return width > 0 ? width : 0;
  }, [layout.width, navigationState.routes.length]);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: navigationState.index * tabWidth,
      useNativeDriver: false,
      speed: 10,
      bounciness: 10,
    }).start();
  }, [navigationState.index, tabWidth]);

  const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
    notifications: "notifications",
    fees: "cash",
    news: "newspaper",
  };

  return (
    <View style={styles.tabContainer}>
      <Animated.View
        style={[
          styles.activeCircle,
          {
            transform: [{ translateX }],
            backgroundColor: activeColor,
            width: tabWidth,
          },
        ]}
      />
      {navigationState.routes.map(
        (
          route: {
            key: string;
            title:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          },
          index: any
        ) => (
          <TouchableOpacity
            key={String(route.key)}
            style={styles.tab}
            onPress={() => setIndex(index)}
          >
            <View style={styles.item}>
              <Ionicons
                name={ICONS[route.key as string] || "document"}
                size={24}
                style={styles.active}
              />
              <Text style={[styles.label, styles.active]}>{route.title}</Text>
            </View>
          </TouchableOpacity>
        )
      )}
    </View>
  );
});

export default function TabViewScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "notifications", title: "Thông báo" },
    { key: "fees", title: "Phí" },
    { key: "news", title: "Tin tức" },
  ]);
  const [notification, setNotification] = useState<NotificationBoxType[]>([]);

  useEffect(() => {
    const handleGetNotification = async () => {
      try {
        const response = await getNotification();

        const newNotifications: NotificationBoxType[] =
          response.notifications.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            type: item.type,
            isRead: item.isRead,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
          }));

        setNotification(newNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    handleGetNotification();
  }, []); // 👈 Chỉ chạy một lần khi component mount

  console.log("Notifications:", notification); // 👈 Kiểm tra dữ liệu notification
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        notifications: () => (
          <NotificationsScreen
            data={notification.filter((n) => n.type === "notice")}
          />
        ),
        fees: () => (
          <FeesScreen data={notification.filter((n) => n.type === "Fee")} />
        ),
        news: () => (
          <NewsScreen data={notification.filter((n) => n.type === "News")} />
        ),
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => <CustomTabBar {...props} setIndex={setIndex} />}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
    height: "100%",
    borderRadius: 9,
    zIndex: -1,
  },
  tab: { flex: 1 },
  item: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  label: { fontSize: 16, marginLeft: 5 },
  active: { color: "black" },
});

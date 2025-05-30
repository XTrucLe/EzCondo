import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import NotificationBox from "@/components/ui/notification/NotificationBox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getNotification } from "@/services/notificationService";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import CustomTabBar from "@/components/ui/custome/CustomTabBar";
import { useLanguage } from "@/hooks/useLanguage";
import { useAppNavigator } from "@/navigation/useAppNavigate";

const filterAndSortNotifications = (
  notifications: NotificationBoxType[],
  filterKey?: string
) => {
  return notifications
    .filter((n) => n.type.toLowerCase().includes(filterKey || ""))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

type TabScreenProps = {
  data: NotificationBoxType[];
  filterKey?: string;
  refreshing: boolean;
  onRefresh: () => void;
  onReadLocalUpdate?: (id: string) => void;
};

const TabViewScreen = ({
  data,
  filterKey,
  refreshing,
  onRefresh,
  onReadLocalUpdate,
}: TabScreenProps) => {
  const { navigate } = useAppNavigator();

  const navigateToNotificationDetails = (itemId: string) => {
    console.log("itemId", itemId);

    var selectedNotification = data.find((item) => item.id === itemId);
    console.log("selectedNotification", selectedNotification);

    navigate("NotificationDetail", { selectedNotification });
  };

  return (
    <ScrollView
      style={styles.screen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {filterAndSortNotifications(data, filterKey).map((item) => (
        <NotificationBox
          key={item.id}
          {...item}
          onReadLocalUpdate={onReadLocalUpdate}
          onPress={navigateToNotificationDetails}
        />
      ))}
    </ScrollView>
  );
};

const getRenderScene = (
  notifications: NotificationBoxType[],
  refreshing: boolean,
  onRefresh: () => void,
  onReadLocalUpdate: (id: string) => void
) =>
  SceneMap({
    notifications: () => (
      <TabViewScreen
        data={notifications}
        filterKey="noti"
        refreshing={refreshing}
        onRefresh={onRefresh}
        onReadLocalUpdate={onReadLocalUpdate}
      />
    ),
    fees: () => (
      <TabViewScreen
        data={notifications}
        filterKey="fee"
        refreshing={refreshing}
        onRefresh={onRefresh}
        onReadLocalUpdate={onReadLocalUpdate}
      />
    ),
    news: () => (
      <TabViewScreen
        data={notifications}
        filterKey="new"
        refreshing={refreshing}
        onRefresh={onRefresh}
        onReadLocalUpdate={onReadLocalUpdate}
      />
    ),
  });
export default function NotificationOverviewScreen() {
  const layout = useWindowDimensions();
  const { translation } = useLanguage();
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationBoxType[]>([]);

  const activeColor = useThemeColor({}, "primary");
  const inactiveColor = useThemeColor({}, "textSecondary");
  const backgroundColor = useThemeColor({}, "background");

  const routes = useMemo(
    () => [
      { key: "notifications", title: translation.notification },
      { key: "fees", title: translation.fees },
      { key: "news", title: translation.news },
    ],
    [translation]
  );

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await getNotification();

      const formattedNotifications: NotificationBoxType[] = response
        ? response.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            type: item.type,
            images: item.images,
            isRead: item.isRead,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
            date: item.date || item.createdAt,
          }))
        : [];
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleReadLocalUpdate = useCallback((id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);
  // Hàm này sẽ được gọi khi người dùng kéo để làm mới
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const renderScene = useMemo(
    () =>
      getRenderScene(
        notifications,
        refreshing,
        onRefresh,
        handleReadLocalUpdate
      ),
    [notifications, refreshing, onRefresh]
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <View style={styles.header}>
          <CustomTabBar
            {...props}
            setIndex={setIndex}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
          />
        </View>
      )}
      style={[styles.container, { backgroundColor }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4.65,
    elevation: 5,
  },
  screen: {
    flex: 1,
    paddingTop: 12,
  },
});

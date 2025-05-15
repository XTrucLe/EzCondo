import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import NotificationBox from "@/components/ui/notification/NotificationBox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getNotification } from "@/services/notificationService";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import CustomTabBar from "@/components/ui/custome/CustomTabBar";
import { useNavigation } from "expo-router";

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
  const navigation = useNavigation<any>();

  const handlePress = (itemId: String) => {
    navigation.navigate("notification_details", {
      notice: data.find((item) => item.id === itemId),
    });
  };
  return (
    <ScrollView
      style={styles.screen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data
        .filter((n) => n.type.toLowerCase().includes(filterKey || ""))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((item) => (
          <NotificationBox
            key={item.id}
            {...item}
            onReadLocalUpdate={onReadLocalUpdate}
            onPress={handlePress}
          />
        ))}
    </ScrollView>
  );
};

const NotificationTabs = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationBoxType[]>([]);

  const activeColor = useThemeColor({}, "primary");
  const inactiveColor = useThemeColor({}, "textSecondary");
  const backgroundColor = useThemeColor({}, "background");

  const routes = useMemo(
    () => [
      { key: "notifications", title: "Thông báo" },
      { key: "fees", title: "Phí" },
      { key: "news", title: "Tin tức" },
    ],
    []
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
      SceneMap({
        notifications: () => (
          <TabViewScreen
            data={notifications.filter((n) =>
              n.type.toLowerCase().includes("noti")
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onReadLocalUpdate={handleReadLocalUpdate}
          />
        ),
        fees: () => (
          <TabViewScreen
            data={notifications.filter((n) =>
              n.type.toLowerCase().includes("fee")
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onReadLocalUpdate={handleReadLocalUpdate}
          />
        ),
        news: () => (
          <TabViewScreen
            data={notifications.filter((n) =>
              n.type.toLowerCase().includes("new")
            )}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onReadLocalUpdate={handleReadLocalUpdate}
          />
        ),
      }),
    [notifications, refreshing, onRefresh]
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <CustomTabBar
          {...props}
          setIndex={setIndex}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />
      )}
      style={[styles.container, { backgroundColor }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});

export default NotificationTabs;

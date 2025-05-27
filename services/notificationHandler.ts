import { useAppNavigator } from "@/navigation/useAppNavigate";
import messaging from "@react-native-firebase/messaging";
import { createNavigationContainerRef } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// Thiết lập cấu hình Notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
  sound: "default",
});

const navigationRef = createNavigationContainerRef();

// Dùng để lưu các messageId đã xử lý
const handledMessages = new Set<string>();

const handleNotificationListener = async (
  title?: string,
  message?: string,
  image?: string,
  messageId?: string
) => {
  try {
    // Tránh xử lý lặp lại
    if (messageId && handledMessages.has(messageId)) {
      console.log("⛔️ Đã xử lý thông báo:", messageId);
      return;
    }
    if (messageId) {
      handledMessages.add(messageId);
    }

    if (!title && !message) {
      console.warn("⚠️ Không có tiêu đề hoặc nội dung thông báo");
      return;
    }

    const content: Notifications.NotificationContentInput = {
      title: title || "📩 Thông báo từ EzCondo",
      body: message || "Chào mừng bạn đến với Ứng dụng!",
      data: { image: image || "" },
      sound: "default",
    };

    await Notifications.scheduleNotificationAsync({
      content,
      trigger: null,
    });

    console.log("📬 Đã hiển thị thông báo:", title, message, image);
  } catch (error) {
    console.error("❌ Lỗi khi hiển thị thông báo:", error);
  }
};

export const useNotificationListener = () => {
  const { navigate } = useAppNavigator();

  useEffect(() => {
    let isSubscribed = true;

    // 1️⃣ Foreground
    const unsubscribeForeground = messaging().onMessage(
      async (remoteMessage) => {
        if (!isSubscribed) return;
        console.log("📩 Tin nhắn Foreground:", remoteMessage);
        if (remoteMessage.notification) {
          handleNotificationListener(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
            remoteMessage.notification.image,
            remoteMessage.messageId
          );
        }
      }
    );

    // 2️⃣ Background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("🔄 Tin nhắn Background:", remoteMessage);
      if (remoteMessage.notification) {
        handleNotificationListener(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          remoteMessage.notification.image,
          remoteMessage.messageId
        );
      }
    });

    // 3️⃣ Mở từ thông báo khi app đang chạy
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log("📲 App mở từ thông báo:", remoteMessage);
        // if (remoteMessage.notification) {
        // handleNotificationListener(
        //   remoteMessage.notification.title,
        //   remoteMessage.notification.body,
        //   remoteMessage.notification.image,
        //   remoteMessage.messageId
        // );
        // }
      }
    );

    // 4️⃣ Mở từ thông báo khi app bị tắt
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // if (remoteMessage?.notification) {
        //   console.log("🚀 App mở từ thông báo khi bị tắt:", remoteMessage);
        // handleNotificationListener(
        //   remoteMessage.notification.title,
        //   remoteMessage.notification.body,
        //   remoteMessage.notification.image,
        //   remoteMessage.messageId
        // );
        // }
      });

    return () => {
      isSubscribed = false;
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("📲 Người dùng nhấn vào thông báo (local):", response);

        if (navigationRef.isReady()) {
          navigationRef.navigate("NotificationOverview" as never);
        } else {
          console.warn("⚠️ Navigation chưa sẵn sàng");
        }
      }
    );

    return () => subscription.remove();
  }, []);
};

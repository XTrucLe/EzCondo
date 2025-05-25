import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ✅ Hàm xử lý hiển thị thông báo (Foreground & Background)
const handleNotificationListener = async (
  title?: string,
  message?: string,
  image?: string
) => {
  try {
    if (!title && !message) {
      console.warn("⚠️ Không có tiêu đề hoặc nội dung thông báo");
      return;
    }
    const content: Notifications.NotificationContentInput = {
      title: title || "📩 Thông báo từ EzCondo",
      body: message || "Chào mừng bạn đến với Ứng dụng!",
      data: {
        image: image || "",
      },
      sound: "default",
    };

    await Notifications.scheduleNotificationAsync({
      content,
      trigger: null, // Hiển thị ngay lập tức
    });
    console.log("📬 Đã hiển thị thông báo:", title, message, image);
  } catch (error) {
    console.error("❌ Lỗi khi hiển thị thông báo:", error);
  }
};

// ✅ Lắng nghe thông báo khi app đang mở (Foreground)
export const listenForForegroundMessages = () => {
  messaging().onMessage(async (remoteMessage) => {
    console.log("📩 Tin nhắn nhận khi app đang mở:", remoteMessage);
    if (remoteMessage.notification) {
      handleNotificationListener(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.notification.image
      );
    }
  });
};

// ✅ Lắng nghe thông báo khi app ở background hoặc bị đóng
export const listenForBackgroundMessages = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("🔄 Tin nhắn nhận khi app chạy ngầm:", remoteMessage);
    if (remoteMessage.notification) {
      handleNotificationListener(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    }
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage?.notification) {
      console.log("📲 Người dùng nhấn vào thông báo:", remoteMessage);
      handleNotificationListener(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    }
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage?.notification) {
        console.log(
          "🚀 App mở do người dùng nhấn vào thông báo:",
          remoteMessage
        );
        handleNotificationListener(
          remoteMessage.notification.title,
          remoteMessage.notification.body
        );
      }
    })
    .catch((error) =>
      console.error("❌ Lỗi khi lấy thông báo ban đầu:", error)
    );
};

Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
  sound: "default",
});
// ✅ Custom Hook để tự động kích hoạt lắng nghe thông báo trong App.js
export const useNotificationListener = () => {
  useEffect(() => {
    listenForForegroundMessages();
    listenForBackgroundMessages();
  }, []);
};

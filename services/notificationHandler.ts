import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

// Lắng nghe thông báo khi app đang mở
export const listenForForegroundMessages = () => {
  messaging().onMessage(async (remoteMessage) => {
    console.log("📩 Tin nhắn nhận khi app đang mở:", remoteMessage);
    if (remoteMessage.notification) {
      Alert.alert(
        remoteMessage.notification.title || "No Title",
        remoteMessage.notification.body || "No Body"
      );
    }
  });
};

// Lắng nghe thông báo khi app ở background hoặc bị đóng
export const listenForBackgroundMessages = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("🔄 Tin nhắn nhận khi app chạy ngầm:", remoteMessage);
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "📲 Người dùng nhấn vào thông báo khi app ở background:",
      remoteMessage
    );
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "🚀 App mở do người dùng nhấn vào thông báo:",
          remoteMessage
        );
      }
    });
};

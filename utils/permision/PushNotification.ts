import messaging from "@react-native-firebase/messaging";
import * as Notification from "expo-notifications";
import { Alert } from "react-native";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const status = await Notification.requestPermissionsAsync();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("✅ Quyền thông báo đã được cấp");
  } else {
    Alert.alert(
      "⚠️ Bạn cần cấp quyền nhận thông báo để sử dụng tính năng này."
    );
  }
};

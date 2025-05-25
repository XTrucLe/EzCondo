import { useLanguage } from "@/hooks/useLanguage";
import messaging from "@react-native-firebase/messaging";
import * as Notification from "expo-notifications";
import { Alert } from "react-native";

export const requestUserPermission = async () => {
  const { translation } = useLanguage.getState();
  const authStatus = await messaging().requestPermission();
  const status = await Notification.requestPermissionsAsync();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  console.log("Notification permission status:", status);

  if (enabled) {
    console.log("✅ Quyền thông báo đã được cấp");
  } else {
    Alert.alert(translation.notice, translation.requireNotificationPermission);
  }
};

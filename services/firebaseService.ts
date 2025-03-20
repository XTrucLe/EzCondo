import remoteConfig from "@react-native-firebase/remote-config";
import messaging from "@react-native-firebase/messaging";
import * as SercureStore from "expo-secure-store";

export const getApiUrl = async () => {
  await remoteConfig().setDefaults({
    API_URL: "https://localhost:7245",
  });

  await remoteConfig().fetchAndActivate();
  return remoteConfig().getValue("API_HOST").asString();
};

export const getFCMToken = async () => {
  try {
    let fcmToken = await SercureStore.getItem("fcmToken");

    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await SercureStore.setItem("fcmToken", fcmToken);
        console.log("🔥 FCM Token:", fcmToken);
      }
    }

    return fcmToken;
  } catch (error) {
    console.log("❌ Lỗi lấy FCM Token:", error);
    return null;
  }
};

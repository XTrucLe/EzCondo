import * as Notifications from "expo-notifications";

export type FCMTokenProps = {
  data: string;
  type?: string;
};

export const getFCMToken = async () => {
  try {
    const fcmToken = await Notifications.getDevicePushTokenAsync();

    return fcmToken;
  } catch (error) {
    console.log("❌ Lỗi lấy FCM Token:", error);
    return null;
  }
};

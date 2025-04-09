import { ref, get } from "firebase/database";
import { database } from "./firebase/config";
import { Alert } from "react-native";

export const getApiUrl = async (): Promise<string> => {
  try {
    const snapshot = await get(ref(database, "API_HOST"));
    if (snapshot.exists()) {
      const apiUrl = snapshot.val();
      console.log("🔗 API_HOST từ Firebase:", apiUrl);
      return apiUrl;
    } else {
      console.warn("⚠️ Không có dữ liệu API_HOST trong Realtime DB");
      Alert.alert("Cảnh báo", "Không có dữ liệu API_HOST trong Realtime DB");
      return "http://localhost:7254";
    }
  } catch (err) {
    console.error("❌ Lỗi lấy dữ liệu:", err);
    return "https://localhost:7245";
  }
};

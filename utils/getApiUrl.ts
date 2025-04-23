import { ref, get, getDatabase, update } from "firebase/database";
import { Alert } from "react-native";
import { app } from "./firebase/config";

export const getApiUrl = async (): Promise<string> => {
  let database = getDatabase(app);
  try {
    const snapshot = await get(ref(database, "API_HOST"));
    if (snapshot.exists()) {
      const apiUrl = snapshot.val();
      console.log("🔗 API_HOST từ Firebase:", apiUrl);
      return apiUrl;
    } else {
      console.warn("⚠️ Không có dữ liệu API_HOST trong Realtime DB");
      Alert.alert("Cảnh báo", "Không có dữ liệu API_HOST trong Realtime DB");
      return "http://192.168.1.50:7254";
    }
  } catch (err) {
    console.error("❌ Lỗi lấy dữ liệu:", err);
    return "https://192.168.1.50:7245";
  }
};

export const handleUpdateApiUrl = async (newUrl: string) => {
  const database = getDatabase(app);
  try {
    const apiUrlRef = ref(database, "CURRENT_API_HOST");
    await update(apiUrlRef, { apiUrl: newUrl });
  } catch (error) {
    console.error("❌ Lỗi cập nhật API_HOST:", error);
  }
};

export const chatAPI = " https://chatbott1.onrender.com/chat/ask";

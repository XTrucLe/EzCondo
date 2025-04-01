import remoteConfig from "@react-native-firebase/remote-config";

export const getApiUrl = async (): Promise<string> => {
  remoteConfig().settings = {
    minimumFetchIntervalMillis: 0,
  };
  try {
    await remoteConfig().fetchAndActivate();
    console.log("🔗 Đã cập nhật cấu hình từ Firebase Remote Config!");

    let apiUrl = remoteConfig().getValue("API_HOST").asString();

    console.log("🔗 API URL từ Firebase Remote Config:", apiUrl);

    return apiUrl || "http://localhost:7254"; // Trả về mặc định nếu Remote Config null
  } catch (error) {
    console.error("❌ Lỗi lấy API URL từ Firebase Remote Config:", error);
    return "https://localhost:7245";
  }
};

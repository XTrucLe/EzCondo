import remoteConfig from "@react-native-firebase/remote-config";

export const getApiUrl = async (): Promise<string> => {
  try {
    await remoteConfig().setDefaults({
      API_URL: "https://localhost:7245", // Giá trị mặc định nếu chưa có trong Remote Config
    });

    await remoteConfig().fetchAndActivate();

    const apiUrl = remoteConfig().getValue("API_URL").asString();

    console.log("🔗 API URL từ Firebase Remote Config:", apiUrl);

    return apiUrl || "https://localhost:7245"; // Trả về mặc định nếu Remote Config null
  } catch (error) {
    console.error("❌ Lỗi lấy API URL từ Firebase Remote Config:", error);
    return "https://localhost:7245";
  }
};

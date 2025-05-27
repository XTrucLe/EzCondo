import useAuthStore from "@/hooks/useAuth";
import { chatAPI } from "@/utils/getApiUrl";
import axios from "axios";

export const getAnswerForChat = async (
  question: string,
  session_id: string
) => {
  try {
    const response = await axios.post(`${chatAPI}/chat/ask`, {
      message: question,
      session_id,
    });
    console.log("✅ Kết quả từ API:", response.data);

    return response.data;
  } catch (error) {
    console.log("❌ Lỗi khi gọi API:", error);
    return null;
  }
};

export const createChatSession = async () => {
  const { user } = useAuthStore.getState();
  const token = axios.defaults.headers.common["Authorization"];
  let data = {
    fullname: user?.fullName || "Khách hàng",
    apartmentNumber: user?.apartmentNumber,
    token: token?.toLocaleString().replace("Bearer ", ""),
  };
  console.log("🔗 Tạo phiên chat với dữ liệu:", data);
  try {
    const response = await axios.post(
      `${chatAPI}/session/create_session`,
      data
    );

    return response.data.session_id;
  } catch (error) {
    console.log("❌ Lỗi khi tạo phiên chat:", error);
    return null;
  }
};

import { chatAPI } from "@/utils/getApiUrl";
import axios from "axios";

export const getAnswerForChat = async (question: string) => {
  try {
    const response = await axios.post(chatAPI, { question });
    console.log("✅ Kết quả từ API:", response.data);

    return response.data;
  } catch (error) {
    console.log("❌ Lỗi khi gọi API:", error);
    return null;
  }
};

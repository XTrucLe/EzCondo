import axios from "axios";
import { getToken } from "./authService";
import { getApiUrl } from "@/utils/getApiUrl";

// Khởi tạo Api instance
const createApiInstance = async () => {
  const baseURL = await getApiUrl(); // Lấy URL API từ Firebase Remote Config
  if (!baseURL) {
    throw new Error("Không thể lấy URL API từ Remote Config!");
  }
  console.log("🌐 API URL:", baseURL);

  const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token && !config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        console.error(
          "[API ERROR] Không có phản hồi từ server:",
          error.message
        );

        if (
          error.code === "ECONNABORTED" ||
          error.message === "Network Error"
        ) {
          return Promise.reject({
            message: "Không thể kết nối, kiểm tra mạng!",
            status: 0,
          });
        }

        return Promise.reject({
          message: "Lỗi kết nối. Vui lòng thử lại!",
          details: null,
        });
      }

      const { status, data, config } = error.response;
      const errorMessage = errorMessages[status] || "Đã xảy ra lỗi!";

      console.error(`[API ERROR] ${status}: ${errorMessage}`);

      return Promise.reject(new Error(errorMessage));
    }
  );
  return api;
};

// Mã lỗi và thông báo tương ứng
const errorMessages: Record<number, string> = {
  400: "Yêu cầu không hợp lệ!",
  401: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!",
  403: "Bạn không có quyền truy cập!",
  404: "Không tìm thấy tài nguyên!",
  408: "Yêu cầu quá lâu, vui lòng thử lại!",
  429: "Quá nhiều yêu cầu, hãy thử lại sau!",
  500: "Lỗi hệ thống, vui lòng thử lại sau!",
  502: "Máy chủ gặp sự cố, thử lại sau!",
  503: "Dịch vụ hiện không khả dụng!",
  504: "Máy chủ phản hồi chậm, vui lòng thử lại!",
};

type ApiRequest = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  retryCount?: number;
};

// 🛠️ Hàm gọi API có Retry tự động
export const request = async ({
  method,
  url,
  data,
  retryCount = 1,
}: ApiRequest) => {
  const api = await createApiInstance();
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const response = await api({ method, url, data });
      console.log(`[API SUCCESS] ${method.toUpperCase()} ${url}`);

      return { data: response.data, error: null };
    } catch (error: any) {
      if (attempt === retryCount - 1 || !error.response) {
        console.error(`[API ERROR] Thử lần ${attempt + 1} thất bại:`, {
          message: error.message,
          response: error.response ? error.response.data : null,
          status: error.response ? error.response.status : "No response",
          header: error.config,
        });
        return { data: null, error: error.message };
      }
      console.warn(
        `[API RETRY] Đang thử lại (${attempt + 1}/${retryCount})...`
      );
    }
  }
};

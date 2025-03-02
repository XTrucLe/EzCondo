import axios from "axios";

// Khởi tạo Axios instance
const api = axios.create({
  baseURL: "https://api.example.com", // Thay bằng API của bạn
  timeout: 5000, // Timeout sau 5 giây
  headers: {
    "Content-Type": "application/json",
  },
});

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

// Interceptor xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Lỗi do mất mạng hoặc server không phản hồi
      return Promise.reject({ message: "Lỗi kết nối. Vui lòng thử lại!" });
    }

    const { status, data } = error.response;

    return Promise.reject({
      message: errorMessages[status] || "Đã xảy ra lỗi!",
      details: data,
    });
  }
);

type ApiRequest = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  retryCount?: number;
};

// Hàm gọi API có Retry tự động
export const request = async ({
  method,
  url,
  data,
  retryCount = 3,
}: ApiRequest) => {
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const response = await api({ method, url, data });
      return { data: response.data, error: null };
    } catch (error: any) {
      if (attempt === retryCount - 1) {
        console.error("API Error:", error.message);
        return { data: null, error: error.message };
      }
    }
  }
};

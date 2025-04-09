import axios from "axios";
import { getToken } from "./authService";
import { getApiUrl } from "@/utils/getApiUrl";
import { useLanguage } from "@/hooks/useLanguage";

let apiInstance: ReturnType<typeof axios.create> | null = null;
let currentBaseURL: string | null = null;
// Delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const resetApiInstance = () => {
  apiInstance = null; // Đặt lại apiInstance về null
};

// Khởi tạo Api instance
const getApiInstance = async () => {
  let baseURL = await getApiUrl(); // Lấy URL API từ Firebase Remote Config
  if (currentBaseURL !== baseURL) {
    resetApiInstance(); // Nếu URL khác thì đặt lại apiInstance
    currentBaseURL = baseURL; // Cập nhật currentBaseURL
  }
  if (!apiInstance) {
    apiInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 🛠️ Interceptor để thêm token vào request
    apiInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 🔥 Interceptor xử lý lỗi
    apiInstance.interceptors.response.use(
      (response) => {
        console.debug(
          `[API SUCCESS] ${response.config.method?.toUpperCase()} ${
            response.config.url
          } - ${response.status}`
        );
        return response;
      },
      (error) => {
        const { translation } = useLanguage.getState();
        if (!error.response) {
          return Promise.reject({
            message: translation.apiError,
            status: 0,
          });
        }

        const { status, config } = error.response;
        let errorMessage = translation[status] || translation.apiError;

        // 🔥 Nếu API là `/login` và bị lỗi 401 thì thông báo là "Không tồn tại user"
        if (config.url?.includes("/login")) {
          if (status === 404) {
            errorMessage = translation.not_found;
          }
          if (status === 401) {
            errorMessage = translation.wrong_credentials;
          }
        }

        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  return apiInstance;
};

const shouldRetry = (error: any) => {
  const status = error.response?.status || 0;
  return [408, 429, 500, 502, 503, 504].includes(status);
};

const withRetry = async (fn: () => Promise<any>, retryCount: number) => {
  while (retryCount > 0) {
    try {
      return await fn();
    } catch (error: any) {
      if (!shouldRetry(error)) throw error;
      await delay(1000);
      retryCount--;
    }
  }
};
type ApiRequest = {
  method: "get" | "post" | "put" | "delete" | "patch";
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
  const api = await getApiInstance();
  console.log(
    `[API REQUEST]${api.getUri()} /${method.toUpperCase()} ${url} - ${JSON.stringify(
      data
    )}`
  );

  return withRetry(() => api.request({ method, url, data }), retryCount);
};

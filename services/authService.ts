import * as SecureStore from "expo-secure-store";
import { request } from "@/services/apiService";
import { endpoints } from "@/constants/Endpoints";
import axios from "axios";
import { getUserInfo } from "./UserService";
import { Alert } from "react-native";

const TOKEN_KEY = "authToken";
const USER_KEY = "userData";

// 🔹 Lấy token từ SecureStore
export const getToken = async () => await SecureStore.getItemAsync(TOKEN_KEY);

// 🔹 Lưu token vào SecureStore
export const saveToken = async (token: string) => {
  if (typeof token != "string") throw new Error("Lỗi token không hợp lệ");

  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

// 🔹 Xóa token khỏi SecureStore
export const clearToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const setStorage = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getStorage = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
};

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common["Authorization"];
};

// 🔹 Lấy user từ API
export const fetchUserInfo = async () => {
  try {
    const response = await getUserInfo();
    if (!response) return null; // Handle case when user info is not available

    const user = response?.data;
    if (!user) return null; // Handle case when user data is not available
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)); // Cache user

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// 🔹 Lấy user từ SecureStore (cache)
export const getUserFromStorage = async () => {
  try {
    const userData = await SecureStore.getItemAsync(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user from storage:", error);
    return null;
  }
};

// 🔹 Xóa user khỏi SecureStore
export const clearUserInfo = async () => {
  await SecureStore.deleteItemAsync(USER_KEY);
};

// 🔹 API đăng nhập
export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await request({
      method: "post",
      url: endpoints.auth?.login,
      data: { email, password },
    });
    let token = response?.data?.data?.token;
    await saveToken(token);
    setAuthHeader(token);
    return token;
  } catch (error) {
    throw error;
  }
};

// 🔹 API đăng xuất
export const logoutAPI = async () => {
  await request({ method: "post", url: endpoints.auth.logout });
  await clearToken();
  await clearUserInfo();
  clearAuthHeader();
};

export const forgotPassword = async (email: string) => {
  return request({
    method: "post",
    url: endpoints.auth.forgotPassword,
    data: { email },
  });
};

export const verifyOTP = async (email: string, code: string) => {
  return request({
    method: "post",
    url: endpoints.auth.verifyOTP,
    data: { email, code },
  });
};

export const resetPassword = async (
  tokenMemory: string,
  newPassword: string
) => {
  return request({
    method: "post",
    url: endpoints.auth.resetPassword,
    data: { tokenMemory, newPassword },
  });
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  return request({
    method: "post",
    url: endpoints.auth.updatePassword,
    data: { oldPassword, newPassword },
  });
};

import { create } from "zustand";
import {
  getToken,
  saveToken,
  clearToken,
  fetchUserInfo,
  getUserFromStorage,
  loginAPI,
  logoutAPI,
  resetPassword,
  forgotPassword,
  verifyOTP,
  updatePassword,
  setAuthHeader,
} from "@/services/authService";
import { UserProps } from "@/services/UserService";

const AUTO_LOGOUT_TIME = 300000; // 5 phút

interface AuthState {
  loading: boolean;
  verified: boolean;
  user: UserProps | null;
  logOutTimer: NodeJS.Timeout | null;
  startLogoutTimer: () => void;
  clearLogoutTimer: () => void;
  loadToken: () => Promise<void>;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  verified: false,
  user: null,
  logOutTimer: null,

  startLogoutTimer: () => {
    set({ logOutTimer: setTimeout(get().logout, AUTO_LOGOUT_TIME) });
  },

  clearLogoutTimer: () => {
    if (get().logOutTimer) {
      clearTimeout(get().logOutTimer as NodeJS.Timeout);
      set({ logOutTimer: null });
    }
  },

  loadToken: async () => {
    set({ loading: true });
    try {
      const token = await getToken();
      if (token) {
        const cachedUser = await getUserFromStorage();
        const user = cachedUser || (await fetchUserInfo());
        set({ verified: !!token, user });
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
    set({ loading: false });
  },

  login: async (email, password, rememberMe) => {
    set({ loading: true });
    try {
      const token = await loginAPI(email, password);
      await saveToken(token);
      let user = null;
      if (token) {
        user = await fetchUserInfo();
      }

      set({ verified: true, user });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    set({ loading: false });
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutAPI();
      set({ verified: false, user: null });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
    set({ loading: false });
  },
  forgotPassword: async (email) => {
    set({ loading: true });
    try {
      await forgotPassword(email);
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  verifyOTP: async (otp) => {
    set({ loading: true });
    try {
      await verifyOTP(otp);
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (newPassword) => {
    set({ loading: true });
    try {
      await resetPassword(newPassword);
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updatePassword: async (oldPassword, newPassword) => {
    set({ loading: true });
    try {
      await updatePassword(oldPassword, newPassword);
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;

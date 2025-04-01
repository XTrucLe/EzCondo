import { create } from "zustand";
import {
  getToken,
  saveToken,
  fetchUserInfo,
  getUserFromStorage,
  loginAPI,
  logoutAPI,
  resetPassword,
  forgotPassword,
  verifyOTP,
  updatePassword,
  setStorage,
} from "@/services/authService";
import { regisFCMToken, UserProps } from "@/services/UserService";
import { FCMTokenProps, getFCMToken } from "@/services/firebaseService";

const AUTO_LOGOUT_TIME = 300000; // 5 phút

interface AuthState {
  loading: boolean;
  verified: boolean;
  user: UserProps | null;
  fcm: FCMTokenProps | null;
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
  fcm: null,

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
      const fcm = await getFCMToken();
      if (fcm) {
        set({ fcm });
        await regisFCMToken(fcm.data, fcm.type || "expo", true);
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
      if (rememberMe) {
        await setStorage("EMAIL_KEY", email);
        await setStorage("REMEMBER_KEY", "true");
      }

      if (!token) await saveToken(token);
      let user = null;
      if (token) {
        user = await fetchUserInfo();
      }

      set({ verified: true, user });
    } catch (error) {
      throw error;
    }
    set({ loading: false });
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutAPI();
      await regisFCMToken(
        get().fcm?.data ?? "",
        get().fcm?.type ?? "expo",
        false
      );
      set({ verified: false, user: null });
      set({ fcm: null });
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

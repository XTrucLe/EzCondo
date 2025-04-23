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
import { regisFCMToken } from "@/services/UserService";
import { FCMTokenProps, getFCMToken } from "@/services/firebaseService";
import { UserInfoProps } from "@/utils/type/userInfoType";

const AUTO_LOGOUT_TIME = 300000; // 5 phút

interface AuthState {
  loading: boolean;
  verified: boolean;
  user: UserInfoProps | null;
  setUser: (user: UserInfoProps) => void;
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
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resetPassword: (tokenMemory: string, newPassword: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  verified: false,
  user: null,
  setUser: (user) => set({ user }),
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
    try {
      set({ loading: true });

      const [token, fcm] = await Promise.all([getToken(), getFCMToken()]);
      let user = null;

      if (token) {
        const cachedUser = await getUserFromStorage();
        user = cachedUser || (await fetchUserInfo());
      }

      if (fcm) {
        await regisFCMToken(fcm.data, fcm.type || "expo", true);
      }

      set({ verified: !!token, user, fcm, loading: false });
    } catch (error) {
      console.error("Error loading token:", error);
      set({ loading: false });
    }
  },

  login: async (email, password, rememberMe) => {
    try {
      set({ loading: true });

      const token = await loginAPI(email, password);
      if (!token) throw new Error("Login failed");

      if (rememberMe) {
        await Promise.all([
          setStorage("EMAIL_KEY", email),
          setStorage("REMEMBER_KEY", "true"),
        ]);
      } else {
        await Promise.all([
          setStorage("EMAIL_KEY", ""),
          setStorage("REMEMBER_KEY", "false"),
        ]);
      }

      await saveToken(token);
      const [user, fcm] = await Promise.all([fetchUserInfo(), getFCMToken()]);

      if (fcm) {
        console.log("FCM token:", fcm.data, fcm.type);

        await regisFCMToken(fcm.data, fcm.type || "expo", true);
      }

      set({ verified: true, user, fcm, loading: false });
    } catch (error) {
      console.error("Login error:", error);
      set({ loading: false });
      throw error;
    }
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

  verifyOTP: async (email, otp) => {
    set({ loading: true });
    try {
      const response = await verifyOTP(email, otp);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (tokenMemory, newPassword) => {
    set({ loading: true });
    try {
      await resetPassword(tokenMemory, newPassword);
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

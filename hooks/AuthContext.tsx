import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AppState } from "react-native";
import { useNavigation } from "expo-router";

const API_URL = "https://your-api.com/auth";
const TOKEN_KEY = "authToken";

const AuthContext = createContext<{
  token: string | null;
  isAuthenticating: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
}>({
  token: null,
  isAuthenticating: false,
  login: async (email: string, password: string, rememberMe: boolean) => {},
  logout: async () => {},
  register: async (email: string, password: string) => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === "inactive" || nextAppState === "background") {
        await logout();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      // const response = await axios.post(`${API_URL}/login`, {
      //   email,
      //   password,
      // });
      // const { token } = response.data;
      const token = "your-token";
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setToken(token);

      if (rememberMe) {
        await SecureStore.setItemAsync("EMAIL_KEY", email);
        await SecureStore.setItemAsync("REMEMBER_KEY", "true");
      } else {
        await SecureStore.deleteItemAsync("EMAIL_KEY");
        await SecureStore.deleteItemAsync("REMEMBER_KEY");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    const navigate = useNavigation();
    try {
      await axios.post(`${API_URL}/logout`);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setToken(null);
      navigate.reset({
        index: 0,
        routes: [{ name: "login" as never }],
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
      });
      const { token } = response.data;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      setToken(token);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticating: !!token,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

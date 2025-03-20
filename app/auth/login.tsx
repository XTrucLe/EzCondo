import { loginBackgroundImage } from "@/constants/FakeDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import useAuthStore from "@/hooks/useAuth";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const backgroundColor = useThemeColor({}, "buttonPrimary");
  const textColor = useThemeColor({}, "buttonPrimaryText");
  const inputBorderColor = useThemeColor({}, "inputBorder");

  useEffect(() => {
    const loadRememberedUser = async () => {
      // Load user data from storage
      // If user data exists, set email and rememberMe to the stored values
      const hasRememberedUser = await SecureStore.getItem("REMEMBER_KEY");
      if (hasRememberedUser) {
        const storedEmail = await SecureStore.getItem("EMAIL_KEY");
        if (storedEmail) {
          setEmail(storedEmail);
          setRememberMe(true);
        }
      }
    };
    loadRememberedUser();
  }, []);

  // Hiển thị và ẩn mật khẩu sau 1s
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 1000); // Ẩn sau 3 giây
  };

  // Kiểm tra email hợp lệ
  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateInput = (text: string) => {
    setPassword(text);
    if (!text) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("forgot_password" as never);
  };

  const handleLogin = async () => {
    if (!email || emailError) {
      alert("Please enter a valid email");
      validateEmail(email);
      return;
    }
    if (!password || passwordError) {
      alert("Please enter a password");
      validateInput(password);
      return;
    }
    console.log("Email:", email, "Password:", password);
    try {
      await login(email, password, rememberMe);
      navigation.reset({
        index: 0,
        routes: [{ name: "(tabs)" as never }],
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={loginBackgroundImage}
        style={[styles.container, { paddingTop: insets.top }]}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "position" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={require("../../assets/images/EzCondoIcon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome Back!</Text>

            {/* Email Input */}
            <TextInput
              label="Email"
              value={email}
              onEndEditing={() => validateEmail(email)}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!emailError}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <View style={styles.container}>
              <TextInput
                label="Password"
                value={password}
                onEndEditing={() => validateInput(password)}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword} // Ẩn/hiện mật khẩu
                style={styles.input}
                error={!!passwordError}
                theme={{ colors: { primary: inputBorderColor } }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"} // Icon mắt mở/tắt
                    onPress={togglePasswordVisibility}
                  />
                }
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Remember Me */}
            <View style={styles.rememberForgotContainer}>
              {/* Remember Me */}
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Checkbox
                  status={rememberMe ? "checked" : "unchecked"}
                  onPress={() => setRememberMe(!rememberMe)}
                />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgetPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              style={[styles.button, { backgroundColor }]}
              labelStyle={[styles.buttonLabel, { color: textColor }]}
            >
              Login
            </Button>
            {/* Forgot Password Link */}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 5,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Đẩy Remember Me sang trái, Forgot Password sang phải
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10, // Thêm khoảng cách ngang
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 8, // Khoảng cách giữa checkbox và text
    fontSize: 14,
  },
  forgetPassword: {
    color: "#007AFF",
    fontWeight: "500",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});

export default LoginScreen;

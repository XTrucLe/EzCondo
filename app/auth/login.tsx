import { loginBackgroundImage } from "@/constants/FakeDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useReducer } from "react";
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
  Alert,
} from "react-native";
import { Text, TextInput, Button, Checkbox } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import useAuthStore from "@/hooks/useAuth";
import { applicationImages, enImg, viImg } from "@/constants/ImageLink";
import { useLanguage } from "@/hooks/useLanguage";
import { useValidate } from "@/hooks/useValidate";
import { validateLogin } from "@/utils/validate/validateRules";
import { useLoading } from "@/hooks/useLoading";

// Định nghĩa action types
const actionTypes = {
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  TOGGLE_REMEMBER_ME: "TOGGLE_REMEMBER_ME",
  SET_SHOW_PASSWORD: "SET_SHOW_PASSWORD",
};

// Reducer function
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.TOGGLE_REMEMBER_ME:
      return { ...state, rememberMe: !state.rememberMe };
    case actionTypes.SET_SHOW_PASSWORD:
      return { ...state, showPassword: action.payload };
    default:
      return state;
  }
};

const LoginScreen = () => {
  const { login } = useAuthStore();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { currentLang, translation, setLanguage } = useLanguage();
  const { startLoading, stopLoading } = useLoading();

  // Khởi tạo reducer state
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    rememberMe: false,
    showPassword: false,
  });
  const {
    errors,
    handleSetValues,
    handleChange,
    handleRemoveError,
    validateAll,
  } = useValidate({ email: state.email, password: "" }, validateLogin);

  const backgroundColor = useThemeColor({}, "buttonPrimary");
  const textColor = useThemeColor({}, "buttonPrimaryText");
  const inputBorderColor = useThemeColor({}, "inputBorder");

  useEffect(() => {
    const loadRememberedUser = async () => {
      const hasRememberedUser = await SecureStore.getItem("REMEMBER_KEY");
      if (hasRememberedUser) {
        const storedEmail = await SecureStore.getItem("EMAIL_KEY");
        if (storedEmail) {
          dispatch({ type: actionTypes.SET_EMAIL, payload: storedEmail });
          dispatch({ type: actionTypes.TOGGLE_REMEMBER_ME });
          handleSetValues({ email: storedEmail });
        }
      }
    };

    loadRememberedUser();
  }, []);

  const togglePasswordVisibility = () => {
    dispatch({ type: actionTypes.SET_SHOW_PASSWORD, payload: true });
    setTimeout(() => {
      dispatch({ type: actionTypes.SET_SHOW_PASSWORD, payload: false });
    }, 1000);
  };

  const handleForgotPassword = () => {
    navigation.navigate("forgot_password" as never);
  };

  const handleLogin = async () => {
    validateAll();
    console.log(errors);

    if (errors?.mail != "" && errors?.password != "") return;
    startLoading();
    try {
      await login(state.email, state.password, state.rememberMe);
      navigation.reset({ index: 0, routes: [{ name: "(tabs)" as never }] });
      stopLoading();
    } catch (error) {
      console.error(error);
      Alert.alert(
        translation.error,
        translation.checkInfo,
        [{ text: translation.ok, onPress: () => {} }],
        { cancelable: false }
      );
      stopLoading();
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={applicationImages}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>{translation.wellcome}!</Text>

            <TextInput
              label="Email"
              value={state.email}
              onEndEditing={() => handleChange("email", state.email ?? "")}
              onChangeText={(text) =>
                dispatch({ type: actionTypes.SET_EMAIL, payload: text.trim() })
              }
              onKeyPress={() => handleRemoveError("email")}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
            />
            {errors?.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}

            <TextInput
              label={translation.password}
              value={state.password}
              onEndEditing={() =>
                handleChange("password", state.password ?? "")
              }
              onChangeText={(text) =>
                dispatch({
                  type: actionTypes.SET_PASSWORD,
                  payload: text.trim(),
                })
              }
              mode="outlined"
              secureTextEntry={!state.showPassword}
              style={styles.input}
              onKeyPress={() => handleRemoveError("password")}
              error={!!errors.password}
              theme={{ colors: { primary: inputBorderColor } }}
              right={
                <TextInput.Icon
                  icon={state.showPassword ? "eye-off" : "eye"}
                  onPress={togglePasswordVisibility}
                />
              }
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}

            <View style={styles.rememberForgotContainer}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() =>
                  dispatch({ type: actionTypes.TOGGLE_REMEMBER_ME })
                }
              >
                <Checkbox status={state.rememberMe ? "checked" : "unchecked"} />
                <Text style={styles.rememberMeText}>
                  {translation.rememberMe}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgetPassword}>
                  {translation.forgotPassword}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              mode="contained"
              onPress={handleLogin}
              style={[styles.button, { backgroundColor }]}
              labelStyle={[styles.buttonLabel, { color: textColor }]}
            >
              {translation.login}
            </Button>
          </ScrollView>
          <ChangeLanguage
            currentLang={currentLang}
            changeLanguage={setLanguage}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const ChangeLanguage = ({
  changeLanguage,
  currentLang,
}: {
  changeLanguage: (lang: string) => void;
  currentLang: string;
}) => {
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => changeLanguage(currentLang === "en" ? "vi" : "en")}
    >
      <Image
        source={currentLang === "vi" ? viImg : enImg}
        style={styles.languageImgs}
      />
      <Text style={styles.languageText}>{currentLang}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
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
  input: { marginBottom: 10 },
  errorText: { color: "red", marginBottom: 10, fontSize: 14 },
  button: { marginTop: 10 },
  buttonLabel: { fontSize: 16, paddingVertical: 5 },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  iconContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    right: 20,
    top: 20,
    backgroundColor: "rgba(248, 248, 248, 0.8)",
    height: 50,
    width: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  languageImgs: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
    marginLeft: 5,
  },
});

export default LoginScreen;

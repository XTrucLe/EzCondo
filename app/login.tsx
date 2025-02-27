import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Image,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  // Kiểm tra email hợp lệ
  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = () => {
    if (!email || emailError) {
      alert("Please enter a valid email");
      return;
    }
    console.log("Email:", email, "Password:", password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={require("../assets/images/EzCondoIcon.png")}
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

            {/* Password Input */}
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
            >
              Login
            </Button>

            {/* Social Login */}
            <Text style={styles.orText}>OR</Text>
            <Button icon="google" mode="outlined" style={styles.socialButton}>
              Sign in with Google
            </Button>
            <Button icon="facebook" mode="outlined" style={styles.socialButton}>
              Sign in with Facebook
            </Button>

            {/* Sign Up Link */}
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
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
    padding: 5,
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  socialButton: {
    marginBottom: 10,
  },
  signUpText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  signUpLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default LoginScreen;

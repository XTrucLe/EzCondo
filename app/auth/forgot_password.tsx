import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import useAuthStore from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { forgotPassword } from "./../../services/authService";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();
  const { forgotPassword } = useAuthStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleForgotPassword = async () => {
    setError("");
    if (!email.trim()) {
      setError(translation.inputEmail);
      return;
    }
    if (!validateEmail(email)) {
      setError(translation.invalidEmail);
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(email);
      console.log("Response:", response);

      navigation.navigate("otp", { email });
    } catch (err) {
      console.log("Error:", err);
      Alert.alert("Lỗi", "Không thể gửi yêu cầu. Vui lòng thử lại!", [
        { text: "OK", onPress: () => setError("") },
      ]);
      setError("Không thể gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="lock-closed-outline"
        size={80}
        color="#007AFF"
        style={styles.icon}
      />
      <Text style={styles.title}>{translation.forgotPassword}</Text>
      <Text style={styles.subtitle}>{translation.inputEmail}</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder={translation.email}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{translation.sendCode}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  icon: { alignSelf: "center", marginBottom: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, height: 50, fontSize: 16, marginLeft: 10 },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

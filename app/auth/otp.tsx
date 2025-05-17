import useAuthStore from "@/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const VerifyOTPScreen = () => {
  const navigation = useNavigation<any>();
  const { forgotPassword, verifyOTP } = useAuthStore();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Xử lý nhập OTP
  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; // Chỉ cho phép nhập 1 ký tự
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý gửi lại OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    const handleInput = () => {
      if (otp.every((digit) => digit !== "")) {
        handleVerifyOTP();
      }
    };
    handleInput();
    return () => {
      // Cleanup function to clear the interval if the component unmounts
      setCanResend(false);
    };
  }, [otp]);

  const handleResendOTP = async () => {
    setTimer(60);
    setCanResend(false);
    // Gọi API gửi lại OTP tại đây
    try {
      await forgotPassword(email as string);
      setOtp(["", "", "", "", "", ""]);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Không thể gửi lại mã OTP. Vui lòng thử lại!");
      return;
    }
    alert("Mã OTP đã được gửi lại!");
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      alert("Mã OTP không hợp lệ!");
      return;
    }

    try {
      const response = await verifyOTP(email as string, enteredOTP);
      console.log("OTP verification response:", response);

      navigation.navigate("reset_password", {
        tokenMemory: response,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Không thể xác thực mã OTP. Vui lòng thử lại!");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận OTP</Text>
      <Text style={styles.subtitle}>
        Nhập mã OTP đã gửi đến email:
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>{email}</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !digit && index > 0) {
                inputRefs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={!canResend} onPress={handleResendOTP}>
        <Text style={[styles.resendText, !canResend && { color: "#aaa" }]}>
          {canResend ? "Gửi lại mã OTP" : `Gửi lại sau ${timer}s`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 22,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  resendText: {
    textAlign: "center",
    marginTop: 10,
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default VerifyOTPScreen;

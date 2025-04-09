import { useLanguage } from "@/hooks/useLanguage";
import { handleErrorPassword } from "@/utils/validate/validate";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onEndEditing?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  editable?: boolean;
  disable?: boolean;
  onPress?: (key: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onEndEditing,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  editable = true,
  disable = false,
  onPress,
}) => {
  const [touched, setTouched] = useState(false);
  const { translation } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordError = error?.includes("passwordError");

  const handleSpecialError = (text: string) => {
    let passwordErrors = handleErrorPassword(text, translation);

    if (passwordErrors.length === 0) return null; // Tránh lỗi nếu không có lỗi nào

    return (
      <View>
        {passwordErrors.map(({ key, message, hasError }) => (
          <View key={key} style={styles.errorItem}>
            <Text style={styles.icon}>{hasError ? "❌" : "✅"}</Text>
            <Text style={[hasError ? styles.errorText : styles.trueText]}>
              {message}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const handleDisplayError = (error: string) => {
    const isPasswordError = error.includes("passwordError");
    return isPasswordError ? (
      handleSpecialError(error.replace("passwordError", "").trim())
    ) : (
      <Text style={styles.errorText}>{error}</Text>
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    setTimeout(() => {
      setShowPassword(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        style={styles.input}
        value={value}
        onEndEditing={(e) => onEndEditing?.(e.nativeEvent.text)}
        onFocus={() => (isPasswordError ? setTouched(false) : setTouched(true))}
        error={!!error && (error.includes("passwordError") || touched)}
        theme={{
          colors: {
            primary: error ? "red" : "#6200ee",
          },
        }}
        onChangeText={onChangeText}
        onBlur={() => setTouched(true)}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        editable={editable}
        disabled={disable}
        onPress={onPress}
        mode="outlined"
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={secureTextEntry && showPassword ? "eye-off" : "eye"}
              onPress={() => togglePasswordVisibility()}
              forceTextInputFocus={false}
            />
          ) : null
        }
      />
      {error &&
        (error.includes("passwordError") || touched) &&
        handleDisplayError(error)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  trueText: {
    color: "green",
    fontSize: 14,
    marginTop: 4,
  },

  errorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    fontSize: 16,
    marginRight: 4,
  },
});

export default InputField;

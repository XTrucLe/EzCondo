import InputField from "@/components/ui/custome/InputCustome";
import { useLanguage } from "@/hooks/useLanguage";
import { useLoading } from "@/hooks/useLoading";
import { useValidate } from "@/hooks/useValidate";
import { changePassword } from "@/services/UserService";
import { validateConfirmPassword } from "@/utils/validate/validate";
import { validateChangePassword } from "@/utils/validate/validateRules";
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function ChangePasswordScreen() {
  const { startLoading, stopLoading } = useLoading();

  const [form, setForm] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { translation } = useLanguage();
  const { errors, handleChange, validateAll, values } = useValidate(
    form,
    validateChangePassword
  );
  const handleChangePassword = async () => {
    console.log(values, form);

    if (!validateAll()) {
      Alert.alert(translation.error, translation.checkInfo, [
        { text: translation.ok },
      ]);
      console.log(values, errors);

      return;
    }

    // Kiểm tra xác nhận mật khẩu
    const errorMessage = validateConfirmPassword(
      form.oldPassword,
      form.confirmPassword,
      form.newPassword,
      translation
    );

    if (errorMessage) {
      Alert.alert(translation.error, errorMessage, [{ text: translation.ok }]);
      return;
    }

    // Nếu không có lỗi, tiến hành đổi mật khẩu
    try {
      startLoading();
      await changePassword(form.oldPassword, form.newPassword);

      Alert.alert(translation.success, translation.changePasswordSuccess);
    } catch (error) {
      Alert.alert(translation.error, translation.changePasswordFail);
      console.log(error);
    } finally {
      stopLoading();
    }

    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translation.changePassword}</Text>
      <InputField
        label={translation.oldPassword}
        value={form.oldPassword}
        onEndEditing={() => handleChange("oldPassword", form.oldPassword)}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, oldPassword: text }))
        }
        error={errors?.oldPassword ?? ""}
        secureTextEntry
      />
      <InputField
        label={translation.newPassword}
        value={form.newPassword}
        onEndEditing={() => handleChange("newPassword", form.newPassword)}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, newPassword: text.trim() }));
          handleChange("newPassword", text);
        }}
        error={errors?.newPassword ?? ""}
        secureTextEntry
      />
      <InputField
        label={translation.confirmNewPassword}
        value={form.confirmPassword}
        onEndEditing={() =>
          handleChange("confirmPassword", form.confirmPassword)
        }
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, confirmPassword: text.trim() }))
        }
        error={errors?.confirmPassword ?? ""}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>{translation.changePassword}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1c1c1e",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb", // Blue-600
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

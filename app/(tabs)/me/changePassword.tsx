import InputField from "@/components/ui/custome/InputCustome";
import { useLanguage } from "@/hooks/useLanguage";
import { useValidate } from "@/hooks/useValidate";
import { validateConfirmPassword } from "@/utils/validate/validate";
import { validateChangePassword } from "@/utils/validate/validateRules";
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const ChangePassword = () => {
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
  const handleChangePassword = () => {
    if (!validateAll()) {
      Alert.alert(translation.error, translation.checkInfo, [
        { text: translation.ok },
      ]);
      console.log(values, errors);

      return;
    }

    // Kiểm tra xác nhận mật khẩu
    const errorMessage = validateConfirmPassword(
      form.confirmPassword,
      form.newPassword,
      translation
    );

    if (errorMessage) {
      Alert.alert(translation.error, errorMessage, [{ text: translation.ok }]);
      return;
    }

    // Nếu không có lỗi, tiến hành đổi mật khẩu
    Alert.alert(translation.success, translation.changePasswordSuccess);
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
          setForm((prev) => ({ ...prev, newPassword: text }));
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
          setForm((prev) => ({ ...prev, confirmPassword: text }))
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePassword;

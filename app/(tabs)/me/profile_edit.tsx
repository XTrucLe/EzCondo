import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Card } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { updateAvatar, updateProfile } from "@/services/UserService";
import useAuthStore from "@/hooks/useAuth";
import { userDefaultImage } from "@/constants/ImageLink";
import { useLanguage } from "@/hooks/useLanguage";
import { useValidate } from "@/hooks/useValidate";
import { formFields, UserInfoProps } from "@/utils/type/userInfoType";
import { validateUserInfo } from "@/utils/validate/validateRules";
import CustomeDatePicker from "@/components/ui/Custome.DatePicker";
import InputField from "@/components/ui/custome/InputCustome";
import PickerCustome from "@/components/ui/custome/PickerCustome";

const EditProfileScreen = () => {
  const { user, loadUser } = useAuthStore();
  const navigation = useNavigation<any>();
  const backgroundColor = useThemeColor({}, "background");
  const { translation } = useLanguage();

  // State
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<UserInfoProps>({
    id: user?.id || "N/A",
    fullName: user?.fullName || "",
    email: user?.email || "",
    no: user?.no || "N/A",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "N/A",
    phoneNumber: user?.phoneNumber || "N/A",
    role: user?.role || "N/A",
    apartmentNumber: user?.apartmentNumber || "N/A",
  });
  const { errors, handleChange, validateAll, values } = useValidate(
    form,
    validateUserInfo
  );

  // State để hiển thị DatePicker (lưu tên field đang chọn)
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [avatarChange, setAvatarChange] = useState(false);
  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      if (result.assets[0].uri !== user?.avatar) {
        setAvatarChange(true);
      }
    }
  };

  // Xử lý lưu thông tin
  const onSubmit = async () => {
    console.log("submit", errors);
    console.log("form", values);

    if (validateAll()) return;
    setLoading(true);
    try {
      // Cập nhật thông tin người dùng
      await updateProfile({
        ...user,
        ...form,
      });
      if (avatarChange) {
        const formData = new FormData();
        formData.append("avatar", {
          uri: avatar,
          name: "avatar1.jpg",
          type: "image/jpeg",
        } as any);
        await updateAvatar(formData);
      }
      await loadUser();

      Alert.alert(
        translation.success,
        translation.successUpdate,
        [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "me" }] }),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(translation.error, "Có lỗi xảy ra khi cập nhật thông tin!");
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Ảnh đại diện */}
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          <Image
            source={avatar ? { uri: avatar } : userDefaultImage}
            style={styles.avatar}
          />
          <Text style={styles.changeText}>Thay đổi ảnh</Text>
        </TouchableOpacity>

        {/* Form */}
        <Card style={styles.card}>
          <Card.Content>
            {Object.keys(formFields).map((key) => {
              const field = formFields[key as keyof typeof formFields];
              const value = form[key as keyof UserInfoProps] || "";
              const isEdit = !field?.isEdit;
              const error = errors[key as keyof typeof errors] || null;

              return (
                <View key={key} style={styles.inputContainer}>
                  {field?.type !== "select" ? (
                    <InputField
                      label={translation[field?.label]}
                      value={value}
                      onEndEditing={() =>
                        handleChange(key as keyof UserInfoProps, value)
                      }
                      onChangeText={(text) =>
                        setForm((prev) => ({ ...prev, [key]: text }))
                      }
                      error={
                        error
                          ? String(
                              error[field?.label as keyof typeof error] || ""
                            )
                          : ""
                      }
                      disable={isEdit}
                      onPress={() => {
                        if (field.type === "date") {
                          setShowDatePicker(key);
                        } else if (field.type === "select") {
                          setShowPicker(true);
                        }
                      }}
                    />
                  ) : (
                    <PickerCustome
                      label={translation[field.label]}
                      onValueChange={(val) =>
                        setForm((pre) => ({ ...pre, [key]: val }))
                      }
                      value={value}
                      options={("options" in field && field?.options) || []}
                      translation={translation}
                    />
                  )}
                </View>
              );
            })}
            {showDatePicker && (
              <CustomeDatePicker
                dateValue={form[showDatePicker as keyof UserInfoProps] || ""}
                onChangeDate={(date) => {
                  setForm((prev) => ({ ...prev, [showDatePicker]: date }));
                  setShowDatePicker(null);
                }}
              />
            )}
          </Card.Content>
        </Card>

        {/* Nút Lưu */}
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Lưu thay đổi</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  changeText: {
    color: "#007BFF",
    marginTop: 5,
    fontSize: 14,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F9F9F9",
  },
  dateInput: {
    height: 50,
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F9F9F9",
  },
  pickerContainer: {
    height: 50,
    width: "100%",
    padding: 0,
    margin: 0,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    padding: 0,
    margin: 0,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});

export default EditProfileScreen;

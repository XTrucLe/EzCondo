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
  KeyboardTypeOptions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Card } from "react-native-paper";
import { updateUserInformation } from "@/constants/FakeDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { profileFields } from "@/constants/profile_form";
import { UserProps } from "@/services/UserService";
import useAuthStore from "@/hooks/useAuth";
import { Picker } from "@react-native-picker/picker";
import { userDefaultImage } from "@/constants/ImageLink";
import CustomeDatePicker from "@/components/ui/Custome.DatePicker";

type ProfileForm = {
  fullName: string;
  email: string;
  citizenIdentity: string;
  phoneNumber: string;
  dateOfBirth: string;
};

const EditProfileScreen = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({}, "background");

  // State cho avatar
  const [avatar, setAvatar] = useState(user?.avatar);
  const [loading, setLoading] = useState(false);

  // State form
  const [form, setForm] = useState<UserProps>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    citizenIdentity: user?.citizenIdentity || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: user?.dateOfBirth || "",
  });

  // State lỗi validate
  const [errors, setErrors] = useState<Partial<ProfileForm>>({});

  // State để hiển thị DatePicker (lưu tên field đang chọn)
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null);

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
    }
  };

  // Kiểm tra dữ liệu trước khi lưu
  const validateForm = () => {
    // Nếu cần kiểm tra cụ thể từng trường, thêm logic vào đây
    let newErrors: Partial<ProfileForm> = {};

    // Ví dụ: nếu fullName trống
    if (!form.fullName) {
      newErrors.fullName = "Họ và tên không được để trống!";
    }
    // Thêm các kiểm tra khác...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý lưu thông tin
  const onSubmit = () => {
    if (!validateForm()) return;
    setLoading(true);

    // Giả lập delay và gọi update
    setTimeout(() => {
      try {
        updateUserInformation(form);
        Alert.alert(
          "Cập nhật thành công",
          "Thông tin của bạn đã được lưu lại."
        );
        navigation.reset({ index: 0, routes: [{ name: "index" as never }] });
      } catch (error) {
        console.error(error);
        Alert.alert("Có lỗi xảy ra", "Vui lòng thử lại sau.");
      }
      setLoading(false);
    }, 1000);
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

        <Card style={styles.card}>
          <Card.Content>
            {profileFields.map(
              ({ label, name, keyboardType, isEdit, type, options }) => {
                const value = form[name as keyof UserProps] || "N/A";
                const error = errors[name as keyof ProfileForm];
                const inputKeyboardType =
                  (keyboardType as KeyboardTypeOptions) || "default";

                return (
                  <View
                    key={name}
                    style={[
                      styles.inputContainer,
                      { opacity: loading ? 0.5 : 1 },
                    ]}
                  >
                    <Text style={styles.label}>{label}</Text>

                    {/* Kiểm tra kiểu input */}
                    {type === "date" ? (
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(name)}
                        style={styles.dateInput}
                      >
                        <Text>{value ? value : "Chọn ngày"}</Text>
                      </TouchableOpacity>
                    ) : type === "dropdown" ? (
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={value}
                          onValueChange={(itemValue) =>
                            setForm((prev) => ({ ...prev, [name]: itemValue }))
                          }
                          style={styles.picker}
                          enabled={isEdit}
                        >
                          {options?.map((option) => (
                            <Picker.Item
                              key={option}
                              label={option}
                              value={option}
                            />
                          ))}
                        </Picker>
                      </View>
                    ) : (
                      <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={(text) =>
                          setForm((prev) => ({ ...prev, [name]: text }))
                        }
                        keyboardType={inputKeyboardType}
                        editable={isEdit && !loading}
                      />
                    )}

                    {error && <Text style={styles.errorText}>{error}</Text>}
                  </View>
                );
              }
            )}

            {/* Hiển thị DateTimePicker nếu showDatePicker không null */}
            {showDatePicker && (
              <CustomeDatePicker
                dateValue={form[showDatePicker as keyof UserProps] || ""}
                onChangeDate={(date) => {
                  setForm((prev) => ({ ...prev, [showDatePicker]: date }));
                  setShowDatePicker(null);
                }}
              />
            )}
          </Card.Content>
        </Card>

        {/* Button Lưu */}
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

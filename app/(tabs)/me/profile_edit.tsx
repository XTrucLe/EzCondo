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
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Card } from "react-native-paper";
import { userInformation } from "@/constants/BackgroundImage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";

const profileFields = [
  { label: "🧑 Họ và tên:", name: "name", isEdit: true },
  { label: "📄 CMND/CCCD:", name: "citizen_identity", isEdit: true },
  { label: "📅 Ngày sinh:", name: "date_of_birth", isEdit: true },
  {
    label: "✉️ Email:",
    name: "email",
    keyboardType: "email-address",
    isEdit: false,
  },
  {
    label: " ⚧ Giới tính:",
    name: "gender",
    keyboardType: "gender",
    isEdit: true,
  },
  {
    label: "📞 Số điện thoại:",
    name: "phone_number",
    keyboardType: "phone-pad",
    isEdit: true,
  },
  { label: "🏠 Căn hộ:", name: "apartment_number", isEdit: false },
];
interface ProfileForm {
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  citizen_identity: string;
  date_of_birth: string;
  apartment_number: string;
}

const EditProfileScreen = () => {
  const user = userInformation;
  const navigation = useNavigation();
  const backgroundColor = useThemeColor({}, "background");
  const [avatar, setAvatar] = useState(user.image);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    name: user.name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    gender: user.gender || "",
    citizen_identity: user.citizen_identity || "",
    date_of_birth: user.date_of_birth || "",
    apartment_number: user.apartment_number || "",
  });

  const [errors, setErrors] = useState<Partial<ProfileForm>>({});

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
    let newErrors: Partial<ProfileForm> = {};
    if (!form.name.trim()) newErrors.name = "Tên không được để trống";
    if (!form.email.includes("@")) newErrors.email = "Email không hợp lệ";
    if (form.phone_number && !/^[0-9]{10,11}$/.test(form.phone_number))
      newErrors.phone_number = "Số điện thoại không hợp lệ";
    if (!form.citizen_identity.trim())
      newErrors.citizen_identity = "Vui lòng nhập số CMND/CCCD";
    if (!form.date_of_birth.trim())
      newErrors.date_of_birth = "Vui lòng nhập ngày sinh";
    if (!form.apartment_number.trim())
      newErrors.apartment_number = "Vui lòng nhập số căn hộ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý lưu thông tin
  const onSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Cập nhật thành công", "Thông tin của bạn đã được lưu lại.");
      navigation.goBack();
    }, 1000);
  };

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Ảnh đại diện */}
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          <Image
            source={require("../../../assets/images/Avata_user.png")}
            style={styles.avatar}
          />
          <Text style={styles.changeText}>Thay đổi ảnh</Text>
        </TouchableOpacity>

        <Card style={styles.card}>
          <Card.Content>
            {profileFields.map(({ label, name, keyboardType, isEdit }) => (
              <View
                key={name}
                style={[styles.inputContainer, { opacity: loading ? 0.5 : 1 }]}
              >
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setForm({ ...form, [name]: text })}
                  value={form[name as keyof ProfileForm]}
                  keyboardType={keyboardType as any}
                  editable={isEdit && !loading}
                />
                {errors[name as keyof ProfileForm] && (
                  <Text style={styles.errorText}>
                    {errors[name as keyof ProfileForm]}
                  </Text>
                )}
              </View>
            ))}
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

// Styles
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

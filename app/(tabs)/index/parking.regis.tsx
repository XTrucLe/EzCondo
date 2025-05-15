import useAuthStore from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { regisParking } from "@/services/parkingService";
import { UserInfoFormProps } from "@/utils/type/userInfoType";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardTypeOptions,
  Alert,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  RadioButton,
  Card,
  Title,
} from "react-native-paper";

const VehicleCardForm = () => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();
  const { user } = useAuthStore();

  const [owner, setOwner] = useState<UserInfoFormProps>({
    fullName: user?.fullName || "",
    no: user?.no,
    email: user?.email || "",
    apartmentNumber: user?.apartmentNumber || "",
  });
  const [formData, setFormData] = useState({
    vehicleType: "motorcycle",
    cardCount: "1",
    cardType: "monthly",
    note: "",
    agree: false,
  });
  console.log(owner);

  const renderInputField = (
    label: string,
    field: keyof typeof formData,
    placeholder?: string,
    disabled: boolean = false,
    keyboardType: KeyboardTypeOptions = "default"
  ) => (
    <Section key={field} label={label}>
      <TextInput
        key={field}
        mode="outlined"
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={
          typeof formData[field] === "string" ? formData[field] : undefined
        }
        onChangeText={(text) => handleChange(field, text)}
        disabled={disabled}
        style={styles.input}
      />
    </Section>
  );

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // TODO: gửi dữ liệu lên API
    let noMoto =
      formData.vehicleType === "motorcycle" ? Number(formData.cardCount) : 0;
    let noCar = formData.vehicleType === "car" ? Number(formData.cardCount) : 0;

    try {
      const response = await regisParking(noMoto, noCar);

      if (response)
        Alert.alert("Thông báo", "Đăng ký thẻ xe thành công!", [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "(tabs)" }],
              });
            },
          },
        ]);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    console.log("Form data submitted:", formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Phát Hành Thẻ Xe</Title>

            {/* Thông Tin Chủ Xe */}
            {Object.entries(owner).map(([key, value]) =>
              renderInputField(
                translation[key as keyof UserInfoFormProps],
                key as keyof typeof formData,
                owner[key as keyof UserInfoFormProps] as string,
                true
              )
            )}

            {/* Thông Tin Xe */}
            <Section label="Loại xe đăng ký">
              <RadioButton.Group
                onValueChange={(value) => handleChange("vehicleType", value)}
                value={formData.vehicleType}
              >
                <View style={styles.radioRow}>
                  <RadioButton value="motorcycle" />
                  <Text style={styles.radioLabel}>Xe máy</Text>
                  <RadioButton value="car" />
                  <Text style={styles.radioLabel}>Ô tô</Text>
                </View>
              </RadioButton.Group>
            </Section>

            <Section label="Số lượng thẻ cần cấp">
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                value={formData.cardCount?.toString() ?? ""}
                onChangeText={(text) => {
                  // Nếu text là rỗng (người dùng xóa hết số), cho phép xóa
                  if (text === "") {
                    handleChange("cardCount", text);
                  } else {
                    const number = parseInt(text, 10);
                    if (number >= 1 && number <= 4) {
                      handleChange("cardCount", text);
                    }
                  }
                }}
                style={styles.input}
              />
            </Section>

            <Section label="Loại thẻ xe">
              <RadioButton.Group
                onValueChange={(value) => handleChange("cardType", value)}
                value={formData.cardType}
              >
                <View style={styles.radioRow}>
                  <RadioButton value="monthly" />
                  <Text style={styles.radioLabel}>Thẻ tháng</Text>
                  <RadioButton value="quarterly" />
                  <Text style={styles.radioLabel}>Thẻ quý</Text>
                  <RadioButton value="yearly" />
                  <Text style={styles.radioLabel}>Thẻ năm</Text>
                </View>
              </RadioButton.Group>
            </Section>

            <Section label="Ghi chú (nếu có)">
              <TextInput
                mode="outlined"
                value={formData.note}
                onChangeText={(text) => handleChange("note", text)}
                style={styles.multilineInput}
                multiline
              />
            </Section>

            {/* Xác nhận */}
            <View style={styles.confirmRow}>
              <Checkbox
                status={formData.agree ? "checked" : "unchecked"}
                onPress={() => handleChange("agree", !formData.agree)}
              />
              <Text>
                Tôi xác nhận thông tin đúng và đồng ý sử dụng các thẻ theo quy
                định.
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={!formData.agree}
              style={styles.button}
            >
              {translation.regis}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({ label, children }: { label: string; children: any }) => (
  <View style={styles.section}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  inner: { padding: 16 },
  card: { elevation: 4, borderRadius: 8 },
  title: { textAlign: "center", marginBottom: 16 },
  section: { marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: "bold" },
  input: { backgroundColor: "white", height: 45 },
  multilineInput: {
    backgroundColor: "white",
    height: 100,
    textAlignVertical: "top",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { flex: 0.48 },
  radioRow: { flexDirection: "row", alignItems: "center" },
  radioLabel: { marginRight: 16 },
  confirmRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  button: { marginTop: 8 },
});

export default VehicleCardForm;

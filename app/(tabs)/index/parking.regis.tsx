import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  KeyboardTypeOptions,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Checkbox,
  Card,
  Title,
} from "react-native-paper";
import { useNavigation } from "expo-router";
import { regisParking } from "@/services/parkingService";
import useAuthStore from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { UserInfoFormProps } from "@/utils/type/userInfoType";

const VehicleCardForm = () => {
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();
  const { user } = useAuthStore();

  const [owner] = useState<UserInfoFormProps>({
    fullName: user?.fullName || "",
    apartmentNumber: user?.apartmentNumber || "",
  });

  const [formData, setFormData] = useState({
    vehicleType: [] as string[],
    cardCounts: {} as Record<string, string>,
    cardType: "monthly",
    note: "",
    agree: false,
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVehicleType = (type: string) => {
    const updatedTypes = formData.vehicleType.includes(type)
      ? formData.vehicleType.filter((t) => t !== type)
      : [...formData.vehicleType, type];

    const updatedCounts = { ...formData.cardCounts };
    if (!formData.vehicleType.includes(type)) {
      updatedCounts[type] = "1"; // default count
    } else {
      delete updatedCounts[type]; // remove count if unselected
    }

    setFormData((prev) => ({
      ...prev,
      vehicleType: updatedTypes,
      cardCounts: updatedCounts,
    }));
  };

  const handleSubmit = async () => {
    const noMoto = parseInt(formData.cardCounts.motorcycle || "0", 10);
    const noCar = parseInt(formData.cardCounts.car || "0", 10);
    console.log("Form data:", noCar, noMoto);

    try {
      const response = await regisParking(noMoto, noCar);
      if (response) {
        Alert.alert(translation.notice, translation.sucessRegis, [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: "(tabs)" }] }),
          },
        ]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(translation.notice, translation.faildRegis, [
        {
          text: "OK",
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: "(tabs)" }] }),
        },
      ]);
    }
  };

  const renderInputField = (
    label: string,
    value: string,
    disabled = false,
    keyboardType: KeyboardTypeOptions = "default"
  ) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        mode="outlined"
        value={value}
        disabled={disabled}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Phát Hành Thẻ Xe</Title>

            {/* Thông Tin Chủ Xe */}
            {renderInputField("Họ tên", owner.fullName, true)}
            {renderInputField("Căn hộ", owner?.apartmentNumber ?? "", true)}

            {/* Chọn loại xe và nhập số lượng */}
            <View style={styles.section}>
              <Text style={styles.label}>Loại xe đăng ký</Text>
              {["motorcycle", "car"].map((type) => {
                const isSelected = formData.vehicleType.includes(type);
                return (
                  <View key={type} style={styles.vehicleSection}>
                    <View style={styles.checkboxRow}>
                      <Checkbox
                        status={isSelected ? "checked" : "unchecked"}
                        onPress={() => toggleVehicleType(type)}
                      />
                      <Text style={styles.checkboxLabel}>
                        {type === "motorcycle" ? "Xe máy" : "Ô tô"}
                      </Text>
                    </View>

                    <TextInput
                      mode="outlined"
                      label="Số lượng thẻ"
                      keyboardType="number-pad"
                      value={formData.cardCounts[type] || ""}
                      onChangeText={(text) => {
                        if (
                          text === "" ||
                          (/^\d+$/.test(text) &&
                            parseInt(text, 10) >= 1 &&
                            parseInt(text, 10) <= 4)
                        ) {
                          setFormData((prev) => ({
                            ...prev,
                            cardCounts: {
                              ...prev.cardCounts,
                              [type]: text,
                            },
                          }));
                        }
                      }}
                      disabled={!isSelected}
                      style={[
                        styles.input,
                        !isSelected && { backgroundColor: "#eee" },
                      ]}
                    />
                  </View>
                );
              })}
            </View>
            {/* Ghi chú */}
            <View style={styles.section}>
              <Text style={styles.label}>Ghi chú (nếu có)</Text>
              <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.multilineInput}
                value={formData.note}
                onChangeText={(text) => handleChange("note", text)}
              />
            </View>

            {/* Xác nhận */}
            <View style={styles.confirmRow}>
              <Checkbox
                status={formData.agree ? "checked" : "unchecked"}
                onPress={() => handleChange("agree", !formData.agree)}
              />
              <Text style={{ flex: 1 }}>
                Tôi xác nhận thông tin đúng và đồng ý sử dụng các thẻ theo quy
                định.
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={
                !formData.agree ||
                (formData.vehicleType.length === 0 &&
                  Object.keys(formData.cardCounts).length === 0)
              }
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  inner: { padding: 16 },
  card: { elevation: 4, borderRadius: 8 },
  title: { textAlign: "center", marginBottom: 16 },
  section: { marginBottom: 16 },
  label: { fontWeight: "bold", marginBottom: 6 },
  input: { backgroundColor: "white", height: 45 },
  multilineInput: {
    backgroundColor: "white",
    textAlignVertical: "top",
  },
  vehicleSection: {
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  confirmRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default VehicleCardForm;

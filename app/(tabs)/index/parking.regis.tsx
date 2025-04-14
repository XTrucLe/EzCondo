import InputField from "@/components/ui/custome/InputCustome";
import { useLanguage } from "@/hooks/useLanguage";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Card } from "react-native-paper";

const ParkingRegisForm: React.FC = () => {
  const { translation } = useLanguage();
  const [formData, setFormData] = useState([
    {
      name: "",
      vehicleNumber: "",
      contactNumber: "",
    },
  ]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleAddForm = () => {
    setFormData([
      ...formData,
      { name: "", vehicleNumber: "", contactNumber: "" },
    ]);
  };
  const handleSubmit = () => {
    Alert.alert("Parking Registration Data", JSON.stringify(formData));
    // Add your form submission logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Registration Form</Text>
      {formData.map((form, index) => (
        <Card key={index} style={{ marginBottom: 20 }}>
          <Card.Title title={`${translation.parkingCard} #${index + 1}`} />
          <Card.Content>
            {Object.keys(form).map((field) => (
              <InputField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form.name}
                onChangeText={(value) => handleChange(field, value.trim())}
              />
            ))}
          </Card.Content>
        </Card>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add Another Vehicle" onPress={handleAddForm} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ParkingRegisForm;

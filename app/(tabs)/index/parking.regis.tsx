import InputField from "@/components/ui/custome/InputCustome";
import { useLanguage } from "@/hooks/useLanguage";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Card } from "react-native-paper";

const ParkingRegisForm: React.FC = () => {
  const { translation } = useLanguage();
  const [formData, setFormData] = useState([
    {
      id: Date.now().toString(),
      name: "",
      vehicleNumber: "",
      contactNumber: "",
    },
  ]);

  const handleChange = (index: number, name: string, value: string) => {
    const updatedForms = [...formData];
    updatedForms[index][name as keyof (typeof formData)[0]] = value;
    setFormData(updatedForms);
  };

  const handleAddForm = () => {
    setFormData([
      ...formData,
      {
        id: Date.now().toString() + Math.random().toString(),
        name: "",
        vehicleNumber: "",
        contactNumber: "",
      },
    ]);
  };
  const handleSubmit = () => {
    Alert.alert("Parking Registration Data", JSON.stringify(formData));
    // Add your form submission logic here
  };

  return (
    <View style={styles.container}>
      {formData.map((form, index) => (
        <Card key={form.id} style={{ marginBottom: 20 }}>
          <Card.Title title={`${translation.parkingCard} #${index + 1}`} />
          <Card.Content>
            {Object.keys(form)
              .filter((field) => field !== "id")
              .map((field) => (
                <InputField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field as keyof typeof form]}
                  onChangeText={(value) => handleChange(index, field, value)}
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

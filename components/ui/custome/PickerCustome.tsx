import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

type Props = {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: any[];
  translation?: any;
};
const PickerCustome: React.FC<Props> = ({
  label,
  value,
  onValueChange,
  options,
  translation,
}) => {
  return (
    <View style={styles.picker}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={{ height: 50, width: "100%", top: -2 }}
      >
        {options.map((option) => {
          const labelText = translation?.[option] || option;
          return (
            <Picker.Item
              key={labelText}
              label={labelText.charAt(0).toUpperCase() + labelText.slice(1)}
              value={option}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default PickerCustome;

const styles = StyleSheet.create({
  picker: {
    position: "relative",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
    paddingLeft: 10,
    marginVertical: 10,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    color: "#000",
    fontSize: 12,
    marginBottom: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});

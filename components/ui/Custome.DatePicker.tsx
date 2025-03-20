import React from "react";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type CustomeDatePickerProps = {
  dateValue: string;
  onChangeDate: (date: string) => void;
  mode?: "date" | "time";
  display?: "spinner" | "default" | "calendar" | "clock";
};

const CustomeDatePicker = ({
  dateValue,
  onChangeDate,
  mode = "date",
  display = "spinner",
}: CustomeDatePickerProps) => {
  return (
    <View style={styles.container}>
      <DateTimePicker
        value={new Date(dateValue)}
        mode={mode}
        display={display}
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            // Chuyển đổi selectedDate thành định dạng mong muốn, ví dụ: YYYY-MM-DD
            const formattedDate = selectedDate.toISOString().split("T")[0];
            onChangeDate(formattedDate);
          }
        }}
      />
    </View>
  );
};

export default CustomeDatePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden", // Đảm bảo bo tròn áp dụng cho nội dung bên trong
    elevation: 2, // Shadow cho Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
});

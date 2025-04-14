import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import PickerCustome from "@/components/ui/custome/PickerCustome";
import { IncidentType, IncidentTypes } from "@/utils/type/incidentTypes";
import { useLanguage } from "@/hooks/useLanguage";

const MAX_MEDIA = 6;
const NUM_COLUMNS = 3;

const ReportIssueScreen = () => {
  const { translation } = useLanguage();
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
  });

  const [mediaList, setMediaList] = useState([]);
  const navigation = useNavigation();

  const pickMedia = async () => {
    if (mediaList.length >= MAX_MEDIA) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaList(
        (prev) => [...prev, result.assets[0].uri].slice(0, MAX_MEDIA) as never
      );
    }
  };

  const handleSubmit = () => {
    console.log(form);
    if (!form.title || !form.description) {
      alert("Vui lòng nhập tiêu đề và mô tả sự cố.");
      return;
    }
    alert("Báo cáo đã được gửi!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề:</Text>
      <TextInput
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
        style={styles.input}
      />
      <Text style={styles.label}>Loại sự cố:</Text>
      <PickerCustome
        options={[...IncidentTypes]}
        onValueChange={(val) => setForm({ ...form, type: val })}
        value={form.type}
        translation={translation}
      />

      <Text style={styles.label}>Mô tả sự cố:</Text>
      <TextInput
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
        style={styles.input}
        multiline
      />

      <Text style={styles.label}>Hình ảnh/ Video sự việc:</Text>
      <FlatList
        data={[...mediaList, null].slice(0, MAX_MEDIA)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={NUM_COLUMNS}
        key={NUM_COLUMNS}
        renderItem={({ item }) =>
          item ? (
            <Image source={{ uri: item }} style={styles.mediaPreview} />
          ) : (
            <TouchableOpacity style={styles.mediaPicker} onPress={pickMedia}>
              <AntDesign name="plus" size={40} color="#ccc" />
            </TouchableOpacity>
          )
        }
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Gửi báo cáo
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  mediaPicker: {
    width: 105,
    height: 105,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  mediaPreview: {
    width: 105,
    height: 105,
    borderRadius: 5,
    margin: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitButton: {
    marginTop: 20,
  },
});

export default ReportIssueScreen;

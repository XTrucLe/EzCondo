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

const MAX_MEDIA = 6;
const NUM_COLUMNS = 3;

const ReportIssueScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    console.log({ title, description, mediaList });
    alert("Báo cáo đã được gửi!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiêu đề:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Mô tả sự cố:</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
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

import React, { useState } from "react";
import {
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Card, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import PickerCustome from "@/components/ui/custome/PickerCustome";
import { IncidentTypes } from "@/utils/type/incidentTypes";
import { useLanguage } from "@/hooks/useLanguage";
import { sendIncident, sendIncidentImage } from "@/services/incidentService";
import { useLoading } from "@/hooks/useLoading";

const MAX_MEDIA = 6;
const NUM_COLUMNS = 3;

const ReportIssueScreen = () => {
  const { startLoading, stopLoading } = useLoading();
  const { translation } = useLanguage();
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "security",
  });

  const [mediaList, setMediaList] = useState<
    { uri: string; name: string; type: string }[]
  >([]);
  const navigation = useNavigation();

  const pickMedia = async () => {
    if (mediaList.length >= MAX_MEDIA) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const newImage = {
        uri: asset.uri,
        name: asset.fileName || `photo_${Date.now()}.jpg`,
        type: "image/jpeg",
      };
      console.log("newImage", newImage);

      setMediaList((prev) => [...prev, newImage].slice(0, MAX_MEDIA));
    }
  };

  const removeMedia = (index: number) => {
    setMediaList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title) {
      Alert.alert(translation.error, translation.inputTitle);
      return;
    }
    if (!form.description) {
      Alert.alert(translation.error, translation.inputDescription);
      return;
    }
    startLoading();
    try {
      const id = await sendIncident(form);
      if (id) {
        const formData = new FormData();
        formData.append("IncidentId", id);
        mediaList.forEach((media) => {
          formData.append("Images", media as any);
        });

        await sendIncidentImage(formData);
        navigation.goBack();
        Alert.alert(translation.success, translation.successReport);
      }
    } catch (error) {
      console.error("Error sending incident:", error);
      Alert.alert(translation.error, translation.failReport);
    } finally {
      stopLoading();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.screenTitle}>🛠 {translation.sendIncident}</Title>

      <Text style={styles.label}>{translation.incidentTitle}</Text>
      <TextInput
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
        style={styles.input}
        inputMode="text"
        autoCapitalize="none"
        maxLength={100}
        autoCorrect={false}
        placeholder={translation.inputTitle}
      />

      <Text style={styles.label}>{translation.incidentType}</Text>
      <PickerCustome
        options={[...IncidentTypes]}
        onValueChange={(val) => setForm({ ...form, type: val })}
        value={form.type}
        translation={translation}
      />

      <Text style={styles.label}>{translation.descriptionDetail}</Text>
      <TextInput
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
        inputMode="text"
        autoCapitalize="none"
        maxLength={500}
        autoCorrect={false}
        style={[styles.input, { minHeight: 80 }]}
        multiline
        placeholder={translation.inputDescription}
      />

      <Text style={styles.label}>{translation.incidentImage}</Text>
      <FlatList
        data={[...mediaList, null].slice(0, MAX_MEDIA)}
        keyExtractor={(_, index) => index.toString()}
        numColumns={NUM_COLUMNS}
        renderItem={({ item, index }) =>
          item ? (
            <Card style={styles.mediaCard}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeMedia(index)}
              >
                <AntDesign name="closecircle" size={20} color="#f00" />
              </TouchableOpacity>
              <Image source={{ uri: item.uri }} style={styles.mediaImage} />
            </Card>
          ) : (
            <TouchableOpacity style={styles.mediaCard} onPress={pickMedia}>
              <AntDesign name="plus" size={30} color="#ccc" />
            </TouchableOpacity>
          )
        }
        ListEmptyComponent={
          <TouchableOpacity style={styles.mediaCard} onPress={pickMedia}>
            <AntDesign name="plus" size={30} color="#ccc" />
          </TouchableOpacity>
        }
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        contentStyle={{ paddingVertical: 8 }}
        icon="send"
      >
        {translation.sendIncident}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#444",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fafafa",
    marginBottom: 15,
  },
  mediaCard: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    overflow: "hidden",
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeBtn: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 10,
    borderWidth: 2,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 8,
  },
});

export default ReportIssueScreen;

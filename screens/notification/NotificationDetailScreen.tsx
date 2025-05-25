import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import useDateUtils from "@/hooks/useDateUtils";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotificationDetailScreen() {
  const { formatDate } = useDateUtils();
  const { translation } = useLanguage();
  const route = useRoute();
  const { selectedNotification } = route.params as {
    selectedNotification?: NotificationBoxType;
  };

  const MetaRow = ({
    icon,
    text,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
  }) => (
    <View style={styles.metaContainer}>
      <Ionicons name={icon} size={16} color="#666" />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{selectedNotification?.title}</Text>

      <MetaRow
        icon="time-outline"
        text={
          selectedNotification?.createdAt
            ? formatDate(new Date(selectedNotification.createdAt))
            : ""
        }
      />
      <MetaRow
        icon="pricetag-outline"
        text={
          selectedNotification?.type
            ? selectedNotification.type.charAt(0).toUpperCase() +
              selectedNotification.type.slice(1)
            : ""
        }
      />
      <MetaRow
        icon="person-outline"
        text={`${translation.createBy}: ${
          selectedNotification?.createdBy || "Hệ thống"
        }`}
      />
      <Text style={styles.content}>{selectedNotification?.content}</Text>
      {selectedNotification?.images &&
        selectedNotification.images.length > 0 && (
          <View style={styles.imageContainer}>
            {selectedNotification.images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.image}
                resizeMode="contain"
              />
            ))}
          </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#333",
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  imageContainer: {
    marginVertical: 15,
    gap: 10,
  },
  image: {
    width: "80%",
    minHeight: 400,
    borderRadius: 10,
    alignSelf: "center",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginTop: 10,
  },
});

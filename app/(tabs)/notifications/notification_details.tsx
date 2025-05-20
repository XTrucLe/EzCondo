import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import useDateUtils from "@/hooks/useDateUtils";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";

const notification_details = () => {
  const { formatDate } = useDateUtils();
  const { translation } = useLanguage();
  const route = useRoute();
  const { notice } = route.params as { notice?: NotificationBoxType };

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
      <Text style={styles.title}>{notice?.title}</Text>

      <MetaRow
        icon="time-outline"
        text={notice?.createdAt ? formatDate(new Date(notice.createdAt)) : ""}
      />
      <MetaRow icon="pricetag-outline" text={notice?.type ?? ""} />
      <MetaRow
        icon="person-outline"
        text={`Tạo bởi: ${notice?.createdBy || "Hệ thống"}`}
      />
      <Text style={styles.content}>{notice?.content}</Text>
      {notice?.images && notice.images.length > 0 && (
        <View style={styles.imageContainer}>
          {notice.images.map((img, index) => (
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
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
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

export default notification_details;

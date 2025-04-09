import React, { useCallback } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Card } from "react-native-paper";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import { useLanguage } from "@/hooks/useLanguage";
import { handleReadNotice } from "@/services/notificationService";

const NotificationBox: React.FC<NotificationBoxType> = ({
  id,
  title,
  content,
  isRead,
  createBy,
  createAt,
}) => {
  const { translation } = useLanguage();

  // Dùng useCallback để tránh tạo lại function mỗi lần render
  const handleClickNotice = async () => {
    await handleReadNotice(id);
  };

  return (
    <Pressable onPress={handleClickNotice} style={styles.pressable}>
      <Card style={styles.card}>
        <Card.Title title={title} titleStyle={styles.cardTitle} />
        <Card.Content
          style={StyleSheet.flatten([
            styles.cardContent,
            { backgroundColor: isRead ? "#fff" : "#e0f7fa" },
          ])}
        >
          <Text style={styles.cardText}>{content}</Text>
          <Text style={styles.cardFooter}>
            {translation.createBy} {createBy}
          </Text>
          <Text style={styles.cardFooter}>
            {translation.createAt} {createAt}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 15,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardFooter: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});

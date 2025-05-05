import React, { useCallback } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Card } from "react-native-paper";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import { useLanguage } from "@/hooks/useLanguage";
import { handleReadNotice } from "@/services/notificationService";

type BoxProps = NotificationBoxType & {
  onReadLocalUpdate?: (id: string) => void;
};

const NotificationBox: React.FC<BoxProps> = ({
  id,
  title,
  content,
  isRead,
  createdBy,
  createdAt,
  onReadLocalUpdate,
}) => {
  const { translation } = useLanguage();

  const handleClickNotice = useCallback(async () => {
    console.log("Clicked notice with ID:", id, "isRead:", isRead);

    if (!isRead) {
      if (onReadLocalUpdate) {
        onReadLocalUpdate(id);
      }
      await handleReadNotice(id);
    }
  }, [id]);

  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const created = new Date(date);
    const diffMs = now.getTime() - created.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "Mới đây";
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay === 1) return `Hôm qua`;
    return `${diffDay} ngày trước`;
  };

  const displayCreator = createdBy ?? "Hệ thống";
  const relativeTime = getTimeAgo(createdAt);

  return (
    <Pressable onPress={handleClickNotice} style={styles.pressable}>
      <Card style={styles.card}>
        <Card.Title title={title} titleStyle={styles.cardTitle} />
        <Card.Content
          style={[
            styles.cardContent,
            { backgroundColor: isRead ? "#ffffff" : "#e6f2ff" }, // nhẹ hơn #e0f7fa
          ]}
        >
          <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">
            {content}
          </Text>
          <Text style={styles.cardFooter}>
            {translation.createBy}: {displayCreator}
          </Text>
          <Text style={styles.cardRightFooter}>{relativeTime}</Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0056b3", // màu xanh navy
  },
  cardContent: {
    padding: 16,
    borderRadius: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#1a1a1a", // màu gần đen để dễ đọc
    marginBottom: 8,
  },
  cardFooter: {
    fontSize: 13,
    color: "#999", // xám nhạt
    marginTop: 4,
  },
  cardRightFooter: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
    textAlign: "right",
  },
});

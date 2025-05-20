import React, { useCallback } from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Card } from "react-native-paper";
import { NotificationBoxType } from "@/utils/type/notificationBoxType";
import { useLanguage } from "@/hooks/useLanguage";
import { handleReadNotice } from "@/services/notificationService";
import { useNavigation } from "expo-router";

type BoxProps = NotificationBoxType & {
  onReadLocalUpdate?: (id: string) => void;
  onPress?: (id: string) => void;
};

const NotificationBox: React.FC<BoxProps> = ({
  id,
  title,
  content,
  isRead,
  images,
  createdBy,
  createdAt,
  onReadLocalUpdate,
  onPress,
}) => {
  const { translation } = useLanguage();
  const navigation = useNavigation<any>();
  const handleClickNotice = useCallback(async () => {
    // Chỉ thực hiện khi thông báo chưa được đọc
    if (!isRead) {
      if (onReadLocalUpdate) {
        onReadLocalUpdate(id);
      }
      await handleReadNotice(id);
    }
    onPress?.(id);
  }, [id]);

  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const created = new Date(date);
    created.setHours(created.getHours() + 7); // Chuyển đổi sang giờ Việt Nam
    const diffMs = now.getTime() - created.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return translation.justNow;
    if (diffMin < 60) return `${diffMin} ${translation.minutesAgo}`;
    if (diffHour < 24) return `${diffHour} ${translation.hoursAgo}`;
    if (diffDay === 1) return translation.yesterday;
    return `${diffDay} ${translation.daysAgo}`;
  };

  const displayCreator = createdBy ?? "Hệ thống";
  const relativeTime = getTimeAgo(createdAt);

  return (
    <Pressable onPress={handleClickNotice} style={styles.pressable}>
      <Card
        style={[
          styles.card,
          { backgroundColor: isRead ? "#ffffff" : "#eaf2ff" }, // màu nền nhẹ cho thông báo chưa đọc
        ]}
      >
        <Card.Title
          title={title}
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubtitle}
          style={styles.cardHeader} // Áp dụng màu nền cho header
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.contentContainer}>
            {(images?.length ?? 0) > 0 ? (
              <Image source={{ uri: images![0] }} style={styles.image} />
            ) : null}
            <View style={styles.textContainer}>
              <Text
                style={styles.cardText}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {content}
              </Text>
            </View>
          </View>
        </Card.Content>
        <View style={styles.cardFooter}>
          <Text style={styles.cardCreator}>
            {translation.createBy}: {displayCreator}
          </Text>
          <Text style={styles.cardTime}>{relativeTime}</Text>
        </View>
      </Card>
    </Pressable>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  card: {
    borderRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#ddd", // Border nhẹ cho card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 0,
    backgroundColor: "#ffffff", // màu nền mặc định cho card
  },
  cardHeader: {
    backgroundColor: "#DCE3EA", // Màu nền cho phần header
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "100%",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#777777",
  },
  cardContent: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: "#ffffff", // Màu nền trắng cho phần nội dung
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd", // Border nhẹ cho ảnh
  },
  textContainer: {
    flex: 1,
  },
  cardText: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 8,
    lineHeight: 20,
  },
  cardTime: {
    fontSize: 12,
    color: "#888888",
    marginTop: 4,
    textAlign: "right",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff", // Nền nhẹ cho footer
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardCreator: {
    fontSize: 14,
    color: "#999999",
    textAlign: "right",
  },
});

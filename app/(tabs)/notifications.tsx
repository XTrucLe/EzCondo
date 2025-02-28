import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { List, IconButton } from "react-native-paper";

const initialNotifications = [
  { id: "1", text: "Bạn có một tin nhắn mới!", read: false },
  { id: "2", text: "Cập nhật hệ thống vào 10:00 tối nay.", read: true },
  { id: "3", text: "Khuyến mãi đặc biệt chỉ dành cho bạn!", read: false },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const deleteNotification = (id: string) => {
    Alert.alert("Xóa thông báo", "Bạn có chắc muốn xóa thông báo này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () =>
          setNotifications((prev) => prev.filter((item) => item.id !== id)),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationItem, item.read && styles.read]}
            onPress={() => markAsRead(item.id)}
          >
            <List.Item
              title={item.text}
              left={() => (
                <List.Icon icon={item.read ? "bell-outline" : "bell-ring"} />
              )}
              right={() => (
                <IconButton
                  icon="delete"
                  onPress={() => deleteNotification(item.id)}
                />
              )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  notificationItem: {
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 10,
  },
  read: {
    opacity: 0.6,
  },
});

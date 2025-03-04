// app/support/index.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { List, Card, Title, FAB } from "react-native-paper";

const conversations = [
  { id: "1", title: "Vấn đề thanh toán", icon: "credit-card-outline" },
  { id: "2", title: "Lỗi ứng dụng", icon: "alert-circle-outline" },
  { id: "3", title: "Hỗ trợ khác", icon: "help-circle-outline" },
];

type StackParams = {
  chatbot: { id: string; title: string };
};

export default function SupportScreen() {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <View style={styles.container}>
      <Title style={styles.header}>📞 Trung tâm hỗ trợ</Title>

      {conversations.map((item) => (
        <Card
          key={item.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate("chatbot", { id: item.id, title: item.title })
          }
        >
          <Card.Title
            title={item.title}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
          />
        </Card>
      ))}
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
    elevation: 3, // Hiệu ứng đổ bóng
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
  },
});

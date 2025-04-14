// screens/ChatbotHome.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatbotHome = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Trợ lý ảo EzCondo</Text>
      <Text style={styles.description}>
        Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("chatbot")}
      >
        <Text style={styles.buttonText}>Bắt đầu trò chuyện</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatbotHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#1e88e5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

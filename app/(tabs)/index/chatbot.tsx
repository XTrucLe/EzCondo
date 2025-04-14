// screens/ChatbotScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Tin nhắn chào mừng
    const welcomeMessage: Message = {
      id: "init-bot-msg",
      text: "👋 Xin chào! Tôi là trợ lý ảo EzCondo. Bạn cần hỗ trợ gì hôm nay?",
      sender: "bot",
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    const botReply: Message = {
      id: (Date.now() + 1).toString(),
      text: "🤖 Tôi đã nhận được tin nhắn của bạn!",
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMsg : styles.botMsg,
      ]}
    >
      <Text style={styles.msgText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  message: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#1e88e5",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  msgText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#1e88e5",
    padding: 10,
    borderRadius: 8,
  },
});

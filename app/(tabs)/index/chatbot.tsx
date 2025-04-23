// screens/ChatbotScreen.tsx
import { getAnswerForChat } from "@/services/chatbotService";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Tin nhắn chào mừng
    const welcomeMessage: Message = {
      id: "init-bot-msg",
      text: "👋 Xin chào! Tôi là trợ lý ảo EzCondo. Bạn cần hỗ trợ gì hôm nay?",
      sender: "bot",
    };
    setMessages([welcomeMessage]);
  }, []);

  const chatbotAnswer = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await getAnswerForChat(question);
      if (!response) return "Tôi không thể trả lời câu hỏi này.";
      return response.message;
    } catch (error) {
      console.error("Error fetching answer:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const replyText = await chatbotAnswer(input);

    const botReply: Message = {
      id: (Date.now() + 1).toString(),
      text: replyText,
      sender: "bot",
    };

    setMessages((prev) => [...prev, botReply]);
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
      {isLoading && <TypingIndicator />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={isLoading}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isLoading ? "Đang gửi..." : "Gửi"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TypingIndicator = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      style={{
        fontStyle: "italic",
        color: "gray",
        marginLeft: 8,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
      }}
    >
      🤖 Đang nhập{dots}
    </Text>
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

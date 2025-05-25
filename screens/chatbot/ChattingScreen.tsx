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
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        inverted
      />
      {isLoading && <TypingIndicator />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={isLoading}
        >
          <Ionicons
            name="send-sharp"
            size={20}
            color="#fff"
            style={{
              transform: [{ rotate: "-45deg" }],
              marginLeft: 4,
              marginBottom: 2,
            }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    <View style={styles.typingContainer}>
      <ActivityIndicator size="small" color="#999" />
      <Text style={styles.typingText}>🤖 Đang nhập{dots}</Text>
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  chatContainer: {
    padding: 16,
    flexDirection: "column-reverse",
  },
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#1e88e5",
    borderBottomRightRadius: 4,
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#eeeeee",
    borderBottomLeftRadius: 4,
  },
  msgText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#1e88e5",
    padding: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  typingText: {
    color: "#666",
    fontStyle: "italic",
    marginLeft: 8,
  },
});

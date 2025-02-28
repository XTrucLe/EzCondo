import { useLocalSearchParams } from "expo-router";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { List, IconButton } from "react-native-paper";

export default function ChatScreen() {
  const { id, title } = useLocalSearchParams();
  const [messages, setMessages] = useState([
    { id: "1", text: "Xin chào, tôi cần giúp đỡ!", sender: "user" },
    { id: "2", text: "Chào bạn, tôi có thể giúp gì?", sender: "support" },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: Date.now().toString(), text: input, sender: "user" },
    ]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userBubble : styles.supportBubble,
            ]}
          >
            <List.Item
              title={item.text}
              titleStyle={{ color: item.sender === "user" ? "#fff" : "#000" }}
            />
          </View>
        )}
      />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Nhập tin nhắn..."
          />
          <TouchableOpacity onPress={sendMessage}>
            <IconButton icon="send" size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 6,
    borderRadius: 10,
    marginVertical: 3,
    maxWidth: "75%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  supportBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 20,
    marginRight: 10,
  },
});

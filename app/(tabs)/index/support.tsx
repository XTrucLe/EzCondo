import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const faqs = [
  {
    question: "Làm sao để đăng ký dịch vụ?",
    answer: 'Bạn có thể đăng ký dịch vụ trong mục "Dịch vụ" của ứng dụng.',
  },
  {
    question: "Cách báo cáo sự cố?",
    answer: 'Vào phần "Báo cáo sự cố" để gửi thông tin về quản lý.',
  },
  {
    question: "Làm sao để thanh toán hóa đơn?",
    answer: 'Bạn có thể thanh toán trực tiếp qua app trong phần "Hóa đơn".',
  },
];

export default function SupportScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name || !email || !message) {
      Alert.alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    // Xử lý gửi dữ liệu lên server hoặc API ở đây
    Alert.alert("Cảm ơn bạn đã gửi yêu cầu hỗ trợ!");
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hỗ trợ khách hàng</Text>

      <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
      {faqs.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>Q: {item.question}</Text>
          <Text style={styles.answer}>A: {item.answer}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Gửi câu hỏi cho chúng tôi</Text>
      <TextInput
        placeholder="Họ và tên"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Nội dung câu hỏi"
        style={[styles.input, { height: 100 }]}
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Gửi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
    color: "#34495e",
  },
  faqItem: {
    marginBottom: 15,
    backgroundColor: "#ecf0f1",
    padding: 10,
    borderRadius: 8,
  },
  question: {
    fontWeight: "700",
    marginBottom: 5,
    color: "#2980b9",
  },
  answer: {
    color: "#2c3e50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#2980b9",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

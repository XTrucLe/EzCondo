import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FeedbackScreen = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = () => {
    const feedbackData = {
      title,
      feedback,
      type: "feedback",
      reciver: "manager",
    };
    console.log("Feedback data:", feedbackData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phản hồi của bạn</Text>

      <Text style={styles.subtitle}>Tiêu đề phản hồi</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: Ứng dụng quá chậm"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.subtitle}>Bạn đánh giá trải nghiệm như thế nào?</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index)}>
            <Ionicons
              name={index <= rating ? "star" : "star-outline"}
              size={32}
              color="#FACC15"
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Ý kiến của bạn</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        multiline
        numberOfLines={5}
        placeholder="Nhập góp ý của bạn..."
        value={feedback}
        onChangeText={setFeedback}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendFeedback}>
        <Text style={styles.buttonText}>Gửi phản hồi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    width: "60%",
    alignSelf: "center",
  },
  starIcon: {
    marginHorizontal: 5,
  },

  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

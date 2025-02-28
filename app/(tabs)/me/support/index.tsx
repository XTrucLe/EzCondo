// app/support/index.tsx
import { View, FlatList } from "react-native";
import { useNavigation } from "expo-router";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

const conversations = [
  { id: "1", title: "Vấn đề thanh toán" },
  { id: "2", title: "Lỗi ứng dụng" },
  { id: "3", title: "Hỗ trợ khác" },
];
type StackParams = {
  chatbot: { id: string; title: string };
};

export default function SupportScreen() {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            left={() => <List.Icon icon="message" />}
            onPress={() => {
              navigation.navigate("chatbot", {
                id: item.id,
                title: item.title,
              });
            }}
          />
        )}
      />
    </View>
  );
}

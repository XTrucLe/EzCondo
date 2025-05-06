import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { Card, Button, Avatar, Snackbar, IconButton } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

// Tạo kiểu dữ liệu cho hóa đơn
type PaymentItem = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid";
};

const mockData: PaymentItem[] = [
  {
    id: "1",
    title: "Phí quản lý tháng 5",
    amount: 500000,
    dueDate: "10/05/2025",
    status: "pending",
  },
  {
    id: "2",
    title: "Phí giữ xe ô tô",
    amount: 800000,
    dueDate: "12/05/2025",
    status: "pending",
  },
  {
    id: "3",
    title: "Phí điện tháng 5",
    amount: 300000,
    dueDate: "05/05/2025",
    status: "paid",
  },
];

const PendingPaymentsScreen = () => {
  const theme = {
    background: useThemeColor({}, "background"),
    card: useThemeColor({}, "cardBackground"),
    text: useThemeColor({}, "text"),
    primary: useThemeColor({}, "primary"),
    success: useThemeColor({}, "success"),
    error: useThemeColor({}, "error"),
  };

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigation = useNavigation();

  // Handle single payment
  const handlePay = (item: PaymentItem) => {
    Alert.alert("Thanh toán", `Bạn muốn thanh toán "${item.title}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          setSnackbarMessage(`Thanh toán thành công "${item.title}"`);
          setShowSnackbar(true);
        },
      },
    ]);
  };

  // Render each item, chỉ hiển thị các hóa đơn có status là "pending"
  const renderItem = ({ item }: { item: PaymentItem }) => {
    if (item.status === "paid") return null; // Bỏ qua những hóa đơn đã thanh toán

    return (
      <Card
        style={[styles.card, { backgroundColor: theme.card }]}
        elevation={5} // Tăng độ sâu để tạo cảm giác hiện đại
        onPress={() => handlePay(item)}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <Avatar.Icon icon="file-document" size={50} color={theme.primary} />
            <View style={styles.cardDetails}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.cardSubtitle, { color: theme.primary }]}>
                Hạn: {item.dueDate}
              </Text>
            </View>
            <IconButton
              icon="chevron-right"
              iconColor={theme.primary}
              size={30}
              onPress={() => handlePay(item)}
            />
          </View>
          <View style={styles.cardFooter}>
            <Text style={[styles.amount, { color: theme.text }]}>
              {item.amount.toLocaleString()}₫
            </Text>
            <Text style={[styles.status, { color: theme.primary }]}>
              Chờ thanh toán
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={mockData.filter((item) => item.status === "pending")}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Line dưới header
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 1.2,
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
    borderRadius: 20, // Làm viền card mềm mại hơn
    overflow: "hidden", // Làm cho viền tròn mượt mà hơn
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 10, // Đảm bảo khoảng cách đều cho card
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  cardFooter: {
    marginTop: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  actions: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default PendingPaymentsScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { Card, Avatar, Snackbar, IconButton } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PaymentWaitingType } from "@/utils/type/paymentType";
import {
  createElectricPayment,
  createParkingPayment,
  createWaterPayment,
  getPaymentNeed,
  paymentService,
} from "@/services/paymentService";
import ModalCustome from "@/components/ui/custome/ModalCustome";
import { getAllOtherService } from "@/services/servicesService";

const apiMap: { [key: string]: (id: string) => void } = {
  booking: paymentService.createPayment,
  electric: createElectricPayment,
  water: createWaterPayment,
  parking: createParkingPayment,
};

const PendingPaymentsScreen = () => {
  const theme = {
    background: useThemeColor({}, "background"),
    card: useThemeColor({}, "cardBackground"),
    text: useThemeColor({}, "text"),
    primary: useThemeColor({}, "primary"),
    success: useThemeColor({}, "success"),
    error: useThemeColor({}, "error"),
  };

  const [data, setData] = useState<PaymentWaitingType[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllOtherService();
        const response = await getPaymentNeed();
        console.log("PendingPaymentsScreen -> response", response);

        setData(response);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // Handle single payment
  const handlePay = (item: PaymentWaitingType) => {
    Alert.alert("Thanh toán", `Bạn muốn thanh toán "${item.type}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          createPaymentQR(item);
          setSnackbarMessage("Đang tạo QR thanh toán...");
        },
      },
    ]);
  };

  const createPaymentQR = async (item: PaymentWaitingType) => {
    try {
      for (const [key, value] of Object.entries(item))
        if (value != null && key != "paymentId" && key.includes("Id")) {
          const func = apiMap[key.replace("Id", "")];

          const response = await func(value as string);
          navigation.navigate("paymentQR", {
            data: response,
          });
        }
    } catch (error) {
      console.log("createPaymentQR -> error", error);
    }
  };

  // Render each item, chỉ hiển thị các hóa đơn có status là "pending"
  const renderItem = ({ item }: { item: PaymentWaitingType }) => {
    // Bỏ qua hóa đơn đã thanh toán
    if (item.status === "completed") return null;

    const handlePress = () => handlePay(item);

    return (
      <Card
        style={[styles.card, { backgroundColor: theme.card }]}
        elevation={2}
        onPress={handlePress}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              <Avatar.Icon
                icon="file-document"
                size={44}
                color={theme.primary}
                style={{ backgroundColor: `${theme.primary}20` }}
              />
            </View>

            <View style={styles.cardDetails}>
              <Text
                style={[styles.cardTitle, { color: theme.text }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.title ??
                  "Hoá đơn " + item?.type?.replace(/booking/gi, "").trim()}
              </Text>
              <Text style={styles.cardSubtitle}>Hạn: {item?.createDate}</Text>
            </View>

            <View style={styles.rightActions}>
              <IconButton
                icon="chevron-right"
                iconColor={theme.primary}
                size={24}
                onPress={handlePress}
                style={styles.chevron}
              />
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={[styles.amount, { color: theme.text }]}>
              {item.amount.toLocaleString()}₫
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: `${theme.primary}20` },
              ]}
            >
              <Text style={[styles.statusText, { color: theme.primary }]}>
                Chờ thanh toán
              </Text>
            </View>
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
        data={data}
        keyExtractor={(item) => item.paymentId}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: "center", color: theme.text }}>
              Không có hóa đơn nào đang chờ thanh toán.
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
      <ModalCustome
        visible={showSnackbar}
        data={{ message: snackbarMessage }}
        setVisible={setShowSnackbar}
        okClose={true}
        okEvent={() => setShowSnackbar(false)}
      />
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
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    opacity: 0.8,
  },
  rightActions: {
    marginLeft: "auto",
  },
  chevron: {
    margin: -8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
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

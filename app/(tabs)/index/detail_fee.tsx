import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { getAllOtherService } from "@/services/servicesService";
import { OtherServiceType } from "@/utils/type/serviceDetailType";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatVND } from "@/hooks/useFormat";
import { useNavigation } from "expo-router";
import { getPaymentNeed, paymentService } from "@/services/paymentService";
import { PaymentWaitingType } from "@/utils/type/paymentType";
import { useLoading } from "@/hooks/useLoading";
import { StatusScreen } from "@/components/ui/screen/StatusScreen";

export default function DetailPaymentFee() {
  const navigation = useNavigation<any>();
  const { startLoading, stopLoading } = useLoading();
  const [data, setData] = React.useState<OtherServiceType[]>([]);
  const [paymentId, setPaymentId] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const paymentNeed = await getPaymentNeed();
        let otherPayment = paymentNeed.find(
          (item: PaymentWaitingType) => item.type.toLowerCase() === "other"
        );

        if (otherPayment) {
          setPaymentId(otherPayment.bookingId);
          const response = await getAllOtherService();
          setData(response || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };
    fetchData();
  }, []);

  const total = data.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    try {
      startLoading();
      const response = await paymentService.createPayment(paymentId);
      navigation.navigate("paymentQR", {
        data: response,
      });
    } catch (error) {
      console.log("Error during payment:", error);
    } finally {
      stopLoading();
    }
  };
  const renderItem = ({ item }: { item: OtherServiceType }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.itemContainer}>
      <View style={styles.itemIcon}>
        <FontAwesome5
          name={getIconForService(item.name)}
          size={20}
          color="#4A6CF7"
        />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.name}>{item.name}</Text>
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatVND(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );

  const getIconForService = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes("bảo hiểm")) return "shield-alt";
    if (name.includes("phí")) return "money-bill-wave";
    if (name.includes("dịch vụ")) return "concierge-bell";
    return "receipt";
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <StatusScreen
          type="empty"
          title="Không có"
          description="không có dữ liệu phí"
        />
      ) : (
        <View style={styles.content}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng Cộng:</Text>
            <Text style={styles.totalPrice}>{formatVND(total)} </Text>
          </View>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handlePayment}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: 50,
    backgroundColor: "#4A6CF7",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E6EDFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#718096",
  },
  priceContainer: {
    backgroundColor: "#E6EDFF",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4A6CF7",
  },
  separator: {
    height: 12,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: "white",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A5568",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A6CF7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#4A5568",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  paymentButton: {
    backgroundColor: "#4A6CF7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});

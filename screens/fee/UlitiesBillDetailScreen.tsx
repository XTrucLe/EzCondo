import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ElectricFee, WaterFee } from "@/utils/type/FeeType";
import { useLoading } from "@/hooks/useLoading";
import {
  createElectricPayment,
  createWaterPayment,
} from "@/services/paymentService";
import useDateUtils from "@/hooks/useDateUtils";

type InfoRowProps = {
  label: string;
  value: string | number;
  valueStyle?: object;
};

// Constants
const STATUS_CONFIG = {
  paid: {
    text: "Đã thanh toán",
    color: "#10B981", // green-500
    icon: "✅",
  },
  unpaid: {
    text: "Chưa thanh toán",
    color: "#EF4444", // red-500
    icon: "⚠️",
  },
  overdue: {
    text: "Quá hạn",
    color: "#FBBF24", // yellow-500
    icon: "⏳",
  },
  pending: {
    text: "Chờ thanh toán",
    color: "#3B82F6", // blue-500
    icon: "⏳",
  },
};

// Components
const InfoRow = ({ label, value, valueStyle = {} }: InfoRowProps) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text
      style={[styles.value, valueStyle]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {value}
    </Text>
  </View>
);

const PaymentButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Thanh Toán Ngay</Text>
  </TouchableOpacity>
);

// Main Component
export default function BillDetailScreen() {
  const route = useRoute();
  const { formatDate } = useDateUtils();
  const navigation = useNavigation<any>();
  const { startLoading, stopLoading } = useLoading();
  const { item, mode } = route.params as {
    item: WaterFee | ElectricFee;
    mode: "water" | "electric";
  };

  const statusInfo = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];

  const handlePayment = async () => {
    startLoading();
    try {
      let response;

      if (mode === "water") {
        const waterItem = item as WaterFee;
        response = await createWaterPayment(waterItem.waterBillId);
      }

      if (mode === "electric") {
        const electricItem = item as ElectricFee;
        response = await createElectricPayment(electricItem.electricBillId);
      }

      if (response)
        navigation.navigate("Payment", {
          screen: "QRCode",
          params: { serviceData: response },
        });
      else Alert.alert("Thông báo", "Không có dữ liệu thanh toán");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      stopLoading();
    }
  };

  const renderSpecificFields = () => {
    if (mode === "electric") {
      const elecItem = item as ElectricFee;
      return (
        <>
          <InfoRow
            label="Chỉ số điện cũ"
            value={elecItem.pre_electric_number}
          />
          <InfoRow
            label="Chỉ số điện mới"
            value={elecItem.current_electric_number}
          />
        </>
      );
    } else if (mode === "water") {
      const waterItem = item as WaterFee;
      return (
        <>
          <InfoRow label="Chỉ số nước cũ" value={waterItem.pre_water_number} />
          <InfoRow
            label="Chỉ số nước mới"
            value={waterItem.current_water_number}
          />
        </>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📄 Chi tiết Hóa đơn</Text>

        <InfoRow label="Tên cư dân" value={item.fullName} />
        <InfoRow label="Căn hộ" value={item.apartmentNumber} />
        <InfoRow label="Số điện thoại" value={item.phoneNumber} />
        <InfoRow label="Email" value={item.email} />
        <InfoRow label="Số công tơ" value={item.meterNumber} />
        <InfoRow
          label="Kỳ thanh toán"
          value={formatDate(new Date(item.paymentTerm), "MM/yyyy")}
        />
        <InfoRow label="Số tiêu thụ" value={item.consumption} />
        {renderSpecificFields()}
        <InfoRow
          label="Thành tiền"
          value={`${item.price.toLocaleString()} VNĐ`}
          valueStyle={{ color: "#1e40af" }}
        />
        <View style={[styles.row, styles.statusContainer]}>
          <Text style={{ fontSize: 16 }}>{statusInfo.icon}</Text>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
        </View>

        {item.status !== "paid" && <PaymentButton onPress={handlePayment} />}
      </View>
      <View style={{ height: 24 }}></View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a365d",
    textAlign: "center",
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#edf2f7",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    color: "#4a5568",
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    flex: 1,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#4299e1",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: "#4299e1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  statusText: {
    marginLeft: 6,
    fontWeight: "600",
  },
});

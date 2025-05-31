import { PaymentType } from "@/utils/type/paymentType";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Animated,
  Clipboard,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { checkStatusPayment } from "@/services/paymentService";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "@/hooks/useLanguage";
import { StatusScreen, StatusType } from "@/components/ui/screen/StatusScreen";
import { useAppNavigator } from "@/navigation/useAppNavigate";
import { logoMB, logoNapas, logoVietQR } from "@/constants/ImageLink";

export default function QRCodeScreen() {
  const { serviceData: data } = useRoute().params as {
    serviceData: PaymentType;
  };
  const { navigate } = useAppNavigator();

  const { width } = Dimensions.get("window");
  const { translation } = useLanguage.getState();
  const navigation = useNavigation<any>();
  const [paymentData, setPaymentData] = useState<PaymentType>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [status, setStatus] = useState<StatusType>("null");
  const [countdown, setCountdown] = useState(5 * 60); // 5 minutes countdown

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPolling(false);
          Alert.alert("Timeout", "Payment verification timed out.");
          navigation.reset([
            {
              index: 0,
              routes: [{ name: "index" }],
            },
          ]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    setPaymentData(data);
  }, [data]);

  useEffect(() => {
    if (paymentData) {
      setIsPolling(true);

      const interval = setInterval(async () => {
        try {
          const response = await checkStatusPayment(paymentData?.paymentId);

          if (response) {
            setIsPolling(false);
            clearInterval(interval);
            setStatus("success");
          }
        } catch (error) {
          console.error("Payment check error:", error);
          setIsPolling(false);
          clearInterval(interval);
        }
      }, 10000);

      return () => {
        clearInterval(interval);
        setIsPolling(false);
      };
    }
  }, [paymentData]);

  const showToast = (message: string) => {
    setToastMessage(message);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setToastMessage(null));
      }, 1500);
    });
  };

  const handleCopy = async (key: string, value: string) => {
    await Clipboard.setString(value);
    showToast(`${key} copied to clipboard!`);
  };

  const renderRowInfo = (key: string, value: string) => (
    <TouchableOpacity
      style={styles.infoRow}
      key={key}
      onPress={() => handleCopy(key, value)}
      activeOpacity={0.7}
    >
      <Text style={styles.informationTitle}>{translation[key]}</Text>
      <View style={styles.valueContainer}>
        <Text
          style={styles.informationValue}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {value}
        </Text>
        <Ionicons
          name="copy-outline"
          size={16}
          color="#6B7280"
          style={styles.copyIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Status indicator */}
      <View style={styles.statusIndicator}>
        <View style={[styles.statusDot, isPolling && styles.statusDotActive]} />
        <Text style={styles.statusText}>
          {isPolling ? translation.waitingPayment : "Payment verified"}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 21,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 16,
          color: "red",
        }}
      >
        {`${Math.floor(countdown / 60)
          .toString()
          .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`}
      </Text>

      {/* QR Code with subtle decoration */}
      <View style={styles.qrCard}>
        <View style={styles.logoContainer}>
          <Image source={logoMB} style={styles.logo} resizeMode="contain" />
          <Image source={logoVietQR} style={styles.logo} resizeMode="contain" />
          <Image source={logoNapas} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.qrCodeWrapper}>
          <QRCode
            value={paymentData?.qrCode}
            size={width * 0.45}
            color="#111827"
            backgroundColor="white"
          />
        </View>
        <Text style={styles.qrInstruction}>{translation.scanQRCode}</Text>
      </View>

      {/* Payment information card */}
      <View style={styles.informationContainer}>
        <Text style={styles.sectionTitle}>{translation.paymentDetail}</Text>

        {paymentData &&
          Object.entries(paymentData)
            .filter(([key]) => key !== "qrCode" && key !== "paymentId")
            .map(([key, value]) => renderRowInfo(key, value))}
      </View>

      {/* Toast notification */}
      {toastMessage && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}

      {status && <StatusScreen type={status} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 24,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: "#3B82F6",
  },
  statusText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  qrCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  logo: {
    width: 80, // hoặc width: '30%' nếu muốn linh hoạt theo màn hình
    height: 32,
  },

  qrCodeWrapper: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  qrInstruction: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: "80%",
    lineHeight: 20,
  },
  informationContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    minHeight: 44, // Đảm bảo chiều cao tối thiểu
  },
  informationTitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    flex: 1, // Chiếm không gian còn lại
    marginRight: 8, // Khoảng cách với phần value
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1, // Cho phép co lại khi cần
    maxWidth: "60%", // Giới hạn chiều rộng tối đa
  },
  informationValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
    flexShrink: 1, // Cho phép text co lại khi cần
  },
  copyIcon: {
    marginLeft: 8,
    flexShrink: 0, // Không cho phép icon co lại
  },
  toastContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#1F2937",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  toastText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

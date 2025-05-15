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
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { checkStatusPayment } from "@/services/paymentService";
import { useNavigation } from "expo-router";

export default function QRScreen() {
  const { data } = useRoute().params as { data: PaymentType };
  const navigation = useNavigation<any>();
  const [paymentData, setPaymentData] = useState<PaymentType>();
  const { width } = Dimensions.get("window");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    setPaymentData(data);
  }, [data]);

  useEffect(() => {
    if (paymentData) {
      setIsPolling(true);

      const interval = setInterval(async () => {
        console.log("Polling...");

        try {
          const response = await checkStatusPayment(paymentData?.paymentId);
          console.log(response);

          if (response) {
            setIsPolling(false);
            clearInterval(interval); // Dừng polling khi nhận được phản hồi

            // Thực hiện thông báo thành công
            Alert.alert(
              "Thanh toán thành công",
              "Bạn có thể tiếp tục sử dụng dịch vụ.",
              [
                {
                  text: "OK",
                  onPress: () =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "services" }],
                    }),
                },
              ]
            );
          }
        } catch (error) {
          console.error("Lỗi khi kiểm tra thanh toán:", error);
          setIsPolling(false); // Dừng polling khi có lỗi
          clearInterval(interval); // Dừng interval khi có lỗi
        }
      }, 10000); // Gọi mỗi 10 giây

      // Cleanup function
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
    showToast(`${key} đã được sao chép!`);
  };

  const renderRowInfo = (key: string, value: string) => (
    <View style={styles.infoRow} key={key}>
      <Text style={styles.informationTitle}>{key}: </Text>
      <Text
        style={styles.informationValue}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.qrCodeContainer,
          { paddingTop: width / 3, paddingBottom: width / 5 },
        ]}
      >
        {paymentData?.qrCode && (
          <QRCode value={paymentData.qrCode} size={width / 2} />
        )}
      </View>

      <View style={styles.informationContainer}>
        {paymentData &&
          Object.entries(paymentData)
            .filter(([key]) => key !== "qrCode")
            .map(([key, value]) => renderRowInfo(key, value))}
      </View>

      {toastMessage && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8", // Màu nền tổng thể
  },
  qrCodeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  qrCodeWrapper: {
    backgroundColor: "#fff", // Nền trắng quanh QR Code
    borderRadius: 15, // Góc bo tròn
    padding: 15, // Padding để QR Code không chạm cạnh
    shadowColor: "#000", // Tạo bóng
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Tạo bóng cho Android
    justifyContent: "center",
    alignItems: "center",
  },
  informationContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    width: "90%",
    marginBottom: 40,
    padding: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  informationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  informationValue: {
    fontSize: 14,
    maxWidth: "60%",
    color: "#555",
    textAlign: "right",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    padding: 5,
    marginLeft: 10,
  },
  toastContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    zIndex: 1000,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
  },
});

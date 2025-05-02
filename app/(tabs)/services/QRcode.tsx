import { PaymentType } from "@/utils/type/paymentType";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Clipboard,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Feather } from "@expo/vector-icons";
import { checkStatusPayment } from "@/services/paymentService";

export default function QRScreen() {
  const { data } = useRoute().params as { data: PaymentType };
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
        console.log(1);

        const response = await checkStatusPayment(data?.paymentId);
        console.log(response);
        if (response == "true") {
          setIsPolling(false);
          [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
          ];
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
  },
  qrCodeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  informationContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 20,
    width: "90%",
    marginBottom: 40,
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

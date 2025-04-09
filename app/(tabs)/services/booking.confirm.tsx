import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [visible, setVisible] = React.useState(false);
  const { startDate, endDate, totalPrice, selectedPackage, numMonths } =
    route.params as {
      startDate: string;
      endDate: string;
      totalPrice: number;
      selectedPackage: string;
      numMonths?: string;
    };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Xác Nhận Đặt Lịch</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Ngày bắt đầu: {startDate}</Text>
        <Text style={styles.detail}>Ngày kết thúc: {endDate}</Text>
        <Text style={styles.detail}>
          💰 Gói dịch vụ:{" "}
          {selectedPackage === "month" ? `${numMonths} tháng` : "1 năm"}
        </Text>
        <Text style={styles.totalPrice}>
          Tổng tiền: ₫ {totalPrice.toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.confirmButtonText}>Xác nhận & Thanh toán</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Chọn Phương Thức Thanh Toán</Text>
            <Text style={styles.totalPrice}>
              Tổng tiền: ₫ {totalPrice.toLocaleString()}
            </Text>

            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>VNPay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Momo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Thẻ ngân hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#d32f2f",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  paymentButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default ConfirmationScreen;

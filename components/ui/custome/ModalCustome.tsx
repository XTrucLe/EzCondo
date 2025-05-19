import { useLanguage } from "@/hooks/useLanguage";
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { formatVND } from "./../../../hooks/useFormat";

type ModalCustomeProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data?: Record<string, any>;
  okClose?: boolean;
  okEvent?: () => void;
};

const ModalCustome = ({
  visible,
  setVisible,
  data,
  okClose,
  okEvent,
}: ModalCustomeProps) => {
  const { translation } = useLanguage();

  const closeModal = () => setVisible(false);

  const statusMap: Record<string, { label: string; style: any }> = {
    success: { label: "Thành công", style: styles.statusSuccess },
    failed: { label: "Thất bại", style: styles.statusFailed },
  };

  const renderValue = useCallback((key: string, value: any) => {
    const keyLower = key.toLowerCase();
    const isMoneyKey = ["amount", "price", "total"].some((k) =>
      keyLower.includes(k)
    );

    if (keyLower === "status") {
      const status = statusMap[value] || {
        label: value || "N/A",
        style: styles.statusDefault,
      };
      return (
        <View style={[styles.statusBadge, status.style]}>
          <Text style={styles.statusText}>{status.label}</Text>
        </View>
      );
    }

    return (
      <Text style={[styles.value, isMoneyKey && styles.money]}>
        {isMoneyKey ? formatVND(value) : value ?? "N/A"}
      </Text>
    );
  }, []);

  const dataEntries = data
    ? Object.entries(data).filter(
        ([key]) => !["avatar", "id", "regency"].includes(key)
      )
    : [];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            📋 {translation.descriptionDetail}
          </Text>

          {data?.avatar && (
            <Image source={{ uri: data.avatar }} style={styles.avatar} />
          )}

          {dataEntries.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              {translation.nodata || "Không có dữ liệu"}
            </Text>
          ) : (
            <FlatList
              style={styles.modalBody}
              data={dataEntries}
              keyExtractor={([key]) => key}
              renderItem={({ item: [key, value] }) => (
                <View style={styles.row} key={key}>
                  <Text style={styles.label}>{translation[key] || key}:</Text>
                  {renderValue(key, value)}
                </View>
              )}
            />
          )}

          <View
            style={[
              styles.footerButtons,
              { justifyContent: okClose ? "space-between" : "center" },
            ]}
          >
            {okClose && (
              <TouchableOpacity
                style={[styles.closeButton, styles.confirmButton]}
                onPress={() => {
                  okEvent && okEvent();
                  closeModal();
                }}
              >
                <Text style={styles.closeButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalBody: {
    maxHeight: 250,
    width: "100%",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  value: {
    flexShrink: 1,
    color: "#555",
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
  statusSuccess: {
    backgroundColor: "#4CAF50",
  },
  statusFailed: {
    backgroundColor: "#F44336",
  },
  statusDefault: {
    backgroundColor: "#9E9E9E",
  },
  money: {
    color: "#007aff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007aff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  footerButtons: {
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 15,
    width: "100%",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
});

export default ModalCustome;

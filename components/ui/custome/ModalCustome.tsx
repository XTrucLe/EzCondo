import { useLanguage } from "@/hooks/useLanguage";
import React from "react";
import { View, Text, StyleSheet, Modal, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";

type ModalCustomeProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data?: Record<string, any>;
};

const ModalCustome = ({ visible, setVisible, data }: ModalCustomeProps) => {
  const { translation } = useLanguage.getState();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>📋 Thông tin chi tiết</Text>

          {/* Hiển thị Avatar nếu có */}
          {data?.avatar && (
            <Image source={{ uri: data.avatar }} style={styles.avatar} />
          )}

          <ScrollView style={styles.modalBody}>
            {data ? (
              Object.entries(data)
                .filter(([key]) => !["avatar", "id"].includes(key)) // Loại bỏ avatar khỏi danh sách
                .map(([key, value]) => (
                  <View key={key} style={styles.row}>
                    <Text style={styles.label}>{formatLabel(key)}:</Text>
                    <Text style={styles.value}>{value || "N/A"}</Text>
                  </View>
                ))
            ) : (
              <Text>{translation.nodata}</Text>
            )}
          </ScrollView>

          <Button
            role="button"
            onPress={() => setVisible(false)}
            children="X"
            style={styles.closeButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const formatLabel = (key: string) => {
  const labels: Record<string, string> = {
    fullName: "Họ và tên",
    dateOfBirth: "Ngày sinh",
    email: "Email",
    gender: "Giới tính",
    no: "Số căn hộ",
    relationship: "Quan hệ",
  };
  return labels[key] || key;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Nền tối khi mở Modal
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5, // Đổ bóng
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
    maxHeight: 250, // Hỗ trợ cuộn nếu dữ liệu dài
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
    flexShrink: 1, // Tránh tràn màn hình
    color: "#555",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: -10,
  },
});

export default ModalCustome;

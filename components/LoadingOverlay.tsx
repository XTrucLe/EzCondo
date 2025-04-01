import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { useLoading } from "@/hooks/useLoading";
import { Modal, Text } from "react-native-paper";

const LoadingOverlay = ({ loadingText }: { loadingText?: string }) => {
  const { isLoading } = useLoading();
  let text = loadingText || "Vui lòng đợi...";
  return (
    <Modal
      visible={isLoading}
      dismissable={false}
      contentContainerStyle={styles.modal}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(88, 88, 88, 0.35)",
  },
  container: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  loadingText: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
  },
});

export default LoadingOverlay;

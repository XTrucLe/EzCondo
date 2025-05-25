// StatusScreen.tsx
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLanguage } from "@/hooks/useLanguage";

export type StatusType =
  | "success"
  | "error"
  | "fail"
  | "loading"
  | "info"
  | "unauthorized"
  | "empty"
  | "null";

interface StatusConfig {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  defaultTitle: string;
}

export interface StatusProps {
  type: StatusType;
  title?: string;
  description?: string;
  onRetry?: () => void;
  buttonText?: string;
  containerStyle?: ViewStyle;
  iconSize?: number;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  buttonProps?: TouchableOpacityProps;
}

const statusConfig: Record<StatusType, StatusConfig> = {
  success: {
    icon: "check-circle-outline",
    color: "#28a745",
    defaultTitle: "Thành công",
  },
  error: {
    icon: "alert-circle-outline",
    color: "#dc3545",
    defaultTitle: "Lỗi hệ thống",
  },
  fail: {
    icon: "close-circle-outline",
    color: "#ff4444",
    defaultTitle: "Thao tác thất bại",
  },
  loading: {
    icon: "progress-clock",
    color: "#007bff",
    defaultTitle: "Đang xử lý...",
  },
  info: {
    icon: "information-outline",
    color: "#17a2b8",
    defaultTitle: "Thông tin",
  },
  unauthorized: {
    icon: "lock-outline",
    color: "#6c757d",
    defaultTitle: "Không có quyền truy cập",
  },
  empty: {
    icon: "inbox-outline",
    color: "#999",
    defaultTitle: "Không có dữ liệu",
  },
  null: {
    icon: "alert-circle-outline",
    color: "#dc3545",
    defaultTitle: "Không có dữ liệu",
  },
};

export const StatusScreen: React.FC<StatusProps> = ({
  type,
  title,
  description,
  onRetry,
  buttonText = "Thử lại",
  containerStyle,
  iconSize = 80,
  titleStyle,
  descriptionStyle,
  buttonProps,
}) => {
  if (type == "null") return;
  const config = statusConfig[type];
  const navigation = useNavigation<any>();
  const { translation } = useLanguage();
  return (
    <View style={[styles.container, containerStyle]}>
      {type === "loading" ? (
        <ActivityIndicator size="large" color={config.color} />
      ) : (
        <>
          <MaterialCommunityIcons
            name={config.icon}
            size={iconSize}
            color={config.color}
            style={styles.icon}
          />
          <Text style={[styles.title, { color: config.color }, titleStyle]}>
            {title || config.defaultTitle}
          </Text>

          {description && (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          )}

          {onRetry && (
            <TouchableOpacity
              onPress={onRetry}
              style={[styles.button, { backgroundColor: config.color }]}
              {...buttonProps}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          )}
          {type === "success" && (
            <TouchableOpacity
              onPress={() =>
                navigation.reset({ index: 0, routes: [{ name: "(tabs)" }] })
              }
              style={[styles.button, { backgroundColor: config.color }]}
              {...buttonProps}
            >
              <Text style={styles.buttonText}>{translation.goback}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
    elevation: 10,
    zIndex: 1000,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
    lineHeight: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

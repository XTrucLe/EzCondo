import * as React from "react";
import { Card, Text, useTheme, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

interface ServiceCardProps {
  title: string;
  description: string;
  type: string;
  duration: string;
  status: "active" | "inactive" | "pending";
  onPress?: () => void;
}

export default function ServiceCardPaper({
  title,
  description,
  type,
  duration,
  status,
  onPress,
}: ServiceCardProps) {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return theme.colors.primary;
      case "pending":
        return "#FFC107";
      case "inactive":
      default:
        return "#F44336";
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title title={title} titleStyle={styles.title} />
      <Card.Content>
        <Text style={styles.label}>Mô tả:</Text>
        <Text>{description}</Text>

        <Text style={styles.label}>Loại dịch vụ:</Text>
        <Text>{type}</Text>

        <Text style={styles.label}>Thời gian:</Text>
        <Text>{duration}</Text>

        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={{ color: getStatusColor(), fontWeight: "bold" }}>
          {status.toUpperCase()}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    marginTop: 8,
    fontWeight: "600",
  },
});

import React, { useState } from "react";
import { View, Text, Animated, Alert, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

interface ActionCardProps {
  title: string;
  description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleDelete = (): void => {
    Alert.alert("Xóa", "Bạn có chắc muốn xóa không?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => console.log("Đã xóa") },
    ]);
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={[styles.rightAction, { opacity }]}>
        <Button mode="contained" onPress={handleDelete} color="red">
          Xóa
        </Button>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <Card style={styles.card}>
          <Card.Title title={title} />
          {expanded && (
            <Card.Content>
              <Text>{description}</Text>
            </Card.Content>
          )}
          <Card.Actions>
            <Button onPress={() => setExpanded(!expanded)}>
              {expanded ? "Thu gọn" : "Xem chi tiết"}
            </Button>
          </Card.Actions>
        </Card>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  rightAction: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ActionCard;

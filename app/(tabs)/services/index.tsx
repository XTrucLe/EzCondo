import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const ServiceOverview = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    ></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
});

export default ServiceOverview;

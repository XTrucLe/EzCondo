import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "expo-router";

const ServiceOverview = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* header had  */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
});

export default ServiceOverview;

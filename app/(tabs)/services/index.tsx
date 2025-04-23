import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation } from "expo-router";
import ServiceCard, { Service } from "@/components/ui/ServiceCard";

const ServiceOverview = () => {
  const navigation = useNavigation<any>();
  const mockService: Service[] = [
    {
      id: "S001",
      name: "Gửi xe máy",
      description: "Gửi 1 xe máy tại tầng hầm B1",
      price: 100000,
      status: "registered",
      registerDate: "01/04/2025",
      expireDate: "30/04/2025",
    },
    {
      id: "S002",
      name: "Gửi xe ô tô",
      description: "Dịch vụ giữ xe ô tô 24/7 tại tầng hầm B2",
      price: 1200000,
      status: "unregistered",
    },
    {
      id: "S003",
      name: "Vệ sinh định kỳ",
      description: "Vệ sinh căn hộ mỗi tuần 1 lần",
      price: 300000,
      status: "registered",
      registerDate: "15/03/2025",
      expireDate: "15/04/2025",
    },
    {
      id: "S004",
      name: "Internet tốc độ cao",
      description: "Gói internet 100Mbps không giới hạn",
      price: 200000,
      status: "registered",
      registerDate: "05/04/2025",
      expireDate: "05/05/2025",
    },
    {
      id: "S005",
      name: "Truyền hình cáp",
      description: "Hơn 100 kênh truyền hình chất lượng cao",
      price: 150000,
      status: "unregistered",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* header had  */}
      {mockService.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
});

export default ServiceOverview;

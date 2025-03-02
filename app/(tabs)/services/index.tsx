import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SERVICES } from "@/constants/AppServices";
import { Ionicons } from "@expo/vector-icons";

const ServiceOverview = () => {
  const [recentServices, setRecentServices] = useState<
    { id: number; name: string; category: string; icon: any }[]
  >([]);

  useEffect(() => {
    loadRecentServices();
  }, []);

  const loadRecentServices = async () => {
    const storedServices = await SecureStore.getItemAsync("recentServices");
    if (storedServices) {
      setRecentServices(JSON.parse(storedServices));
    }
  };

  const handleServicePress = async (service: any) => {
    const updatedRecent = [
      service,
      ...recentServices.filter((s) => s.id !== service.id),
    ].slice(0, 3);
    setRecentServices(updatedRecent);
    await SecureStore.setItemAsync(
      "recentServices",
      JSON.stringify(updatedRecent)
    );
  };

  return (
    <View style={styles.container}>
      {/* Danh sách dịch vụ vừa xem */}
      {recentServices.length > 0 && (
        <>
          <Text style={styles.title}>Dịch vụ vừa xem</Text>
          <FlatList
            data={recentServices}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentItem}
                onPress={() => handleServicePress(item)}
              >
                <Ionicons name={item.icon} size={24} color="#007AFF" />
                <Text style={styles.recentText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* Danh mục dịch vụ */}
      <Text style={styles.title}>Danh mục dịch vụ</Text>
      <FlatList
        data={SERVICES}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handleServicePress(item)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={28} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
    color: "#333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentList: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  recentItem: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
  },
  recentText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginTop: 5,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardCategory: { fontSize: 14, color: "#666", marginTop: 4 },

  text: { fontSize: 16, color: "#333", marginLeft: 10 },
});

export default ServiceOverview;

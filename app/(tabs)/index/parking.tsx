import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const ParkingCard = ({ item }: any) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.owner}</Text>
    <Text>Biển số: {item.licensePlate}</Text>
    <Text>Loại xe: {item.vehicleType}</Text>
    <Text>Ngày đăng ký: {item.registrationDate}</Text>
  </View>
);

const ParkingScreen = () => {
  const [data, setData] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setData((pre) => [
        ...pre,
        {
          id: "1",
          owner: "Nguyễn Văn A",
          licensePlate: "51A-12345",
          vehicleType: "Ô tô",
          registrationDate: "2025-04-01",
        },
      ]);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={ParkingCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 16, color: "#888" }}>
          Không có thẻ đỗ xe nào được đăng ký.
        </Text>
      )}
    </View>
  );
};

export default ParkingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FA",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
});

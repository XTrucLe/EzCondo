import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  getMyParkingDetails,
  getParkingDetails,
} from "@/services/parkingService";
import { ParkingCardType, ParkingType } from "@/utils/type/ParkingType";

const ParkingCard = ({
  item,
  owner,
}: {
  item: ParkingCardType;
  owner: ParkingType;
}) => {
  const statusColorMap: Record<string, string> = {
    active: "#2ecc71", // green
    inactive: "#e74c3c", // red
    pending: "#f39c12", // orange
  };

  const getStatusColor = (type: string) => statusColorMap[type] || "#7f8c8d"; // default gray

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Thẻ Đỗ Xe</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Mã thẻ:</Text>
        <Text style={styles.value}>{item.id.slice(-7)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Loại xe:</Text>
        <Text style={styles.value}>{item.type.toLocaleUpperCase()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.value}>{item.price.toLocaleString()} VNĐ</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tình trạng:</Text>
        <Text style={[styles.value, { color: getStatusColor(item.status) }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={styles.value}>{item.checking}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Chủ sở hữu:</Text>
        <Text style={styles.value}>{owner.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Căn hộ:</Text>
        <Text style={styles.value}>{owner.apartment}</Text>
      </View>
    </View>
  );
};

const ParkingScreen = () => {
  const [data, setData] = React.useState<ParkingType>({
    parkingId: "",
    apartment: "",
    name: "",
    numberOfMotorbike: 0,
    numberOfCar: 0,
    cards: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parkingInfo = await getMyParkingDetails();

        const parkingList = Array.isArray(parkingInfo)
          ? parkingInfo
          : [parkingInfo];

        // Lưu lại thông tin gốc (có thể nhiều bãi đỗ xe)
        setData({ ...parkingList[0] });

        // Gọi song song tất cả parkingId để lấy thẻ
        const allCardsArray = await Promise.all(
          parkingList.map((p) => getParkingDetails(p.parkingId))
        );

        // Gộp tất cả thẻ lại thành 1 mảng
        const mergedCards = allCardsArray.flat();

        // Cập nhật state với toàn bộ cards
        setData((prev) => ({
          ...prev,
          cards: mergedCards,
        }));

        console.log("Merged Cards:", mergedCards);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ParkingCard item={item} owner={data} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", fontSize: 16, color: "#888" }}>
            Không có thẻ đỗ xe nào được đăng ký.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      />
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
    backgroundColor: "#fdfdfd", // nhẹ hơn trắng tinh
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0", // viền nhẹ
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    display: "flex",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 28,
    color: "#2c3e50",
    letterSpacing: 0.5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    paddingLeft: 10,
    width: 150,
    color: "#7f8c8d",
    fontWeight: "600",
    fontSize: 15,
  },

  value: {
    color: "#2c3e50",
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 60,
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginVertical: 12,
    borderRadius: 1,
  },
});

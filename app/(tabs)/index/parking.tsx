import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  getMyParkingDetails,
  getParkingDetails,
} from "@/services/parkingService";
import { ParkingCardType, ParkingType } from "@/utils/type/ParkingType";

type ParkingCardProps = {
  item: ParkingCardType;
  owner: ParkingType;
};

const STATUS_CONFIG = {
  active: { color: "#27ae60", text: "ĐANG HOẠT ĐỘNG", bg: "#e8f5e9" },
  inactive: { color: "#e74c3c", text: "VÔ HIỆU", bg: "#ffebee" },
  pending: { color: "#f39c12", text: "CHỜ DUYỆT", bg: "#fff3e0" },
};

type StatusKey = keyof typeof STATUS_CONFIG;

const ParkingBadge: React.FC<{ status: string }> = ({ status }) => {
  const config = STATUS_CONFIG[status as StatusKey] || {
    color: "#7f8c8d",
    text: "UNKNOWN",
    bg: "#f5f5f5",
  };

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.badgeText, { color: config.color }]}>
        {config.text}
      </Text>
    </View>
  );
};

export const ParkingPassDesign: React.FC<ParkingCardProps> = ({
  item,
  owner,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.cardId}>{item.id.slice(-6).toUpperCase()}</Text>
        <ParkingBadge status={item.status} />
      </View>

      {/* Vehicle Info */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Loại xe</Text>
          <Text style={styles.value}>{item.type.toUpperCase()}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Giá</Text>
          <Text style={styles.value}>
            {item.price.toLocaleString("vi-VN")}₫
          </Text>
        </View>
      </View>

      {/* Owner */}
      <View style={styles.ownerRow}>
        <View>
          <Text style={styles.label}>Chủ sở hữu</Text>
          <Text style={styles.ownerName}>{owner.name}</Text>
        </View>
        <View style={{ alignItems: "center", marginRight: 8 }}>
          <Text style={styles.label}>Căn hộ</Text>
          <Text style={styles.ownerApartment}>{owner.apartment}</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerNote}>THẺ ĐỖ XE THÔNG MINH</Text>
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
        renderItem={({ item }) => (
          <ParkingPassDesign item={item} owner={data} />
        )}
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
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    alignSelf: "center",
    elevation: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: "#3498db",
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  headerLine: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "40%",
    marginTop: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3c3c3c",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  ownerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  ownerApartment: {
    fontSize: 13,
    color: "#666",
  },
  footerNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
});

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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THẺ ĐỖ XE THÔNG MINH</Text>
        <View style={styles.headerLine} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* ID Section with decorative element */}
        <View style={styles.idContainer}>
          <Text style={styles.idLabel}>MÃ THẺ</Text>
          <Text style={styles.idValue}>{item.id.slice(-8).toUpperCase()}</Text>
          <View style={styles.idDecoration} />
        </View>

        {/* Vehicle Info in two columns */}
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>LOẠI XE</Text>
            <Text style={styles.gridValue}>{item.type.toUpperCase()}</Text>
          </View>

          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>GIÁ THẺ</Text>
            <Text style={styles.gridValue}>
              {item.price.toLocaleString("vi-VN")}₫
            </Text>
          </View>
        </View>

        {/* Status Badge */}
        <ParkingBadge status={item.status} />

        {/* Owner Info with subtle separation */}
        <View style={styles.ownerSection}>
          <Text style={styles.ownerLabel}>CHỦ SỞ HỮU</Text>
          <View style={styles.ownerInfo}>
            <Text style={styles.ownerName}>{owner.name}</Text>
            <Text style={styles.ownerApartment}>{owner.apartment}</Text>
          </View>
        </View>

        {/* Footer Decoration */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>HỆ THỐNG QUẢN LÝ BÃI ĐỖ XE</Text>
        </View>
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
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
  content: {
    padding: 24,
    gap: 24,
  },
  idContainer: {
    position: "relative",
  },
  idLabel: {
    color: "#7f8c8d",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 4,
  },
  idValue: {
    color: "#2c3e50",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 2,
  },
  idDecoration: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 60,
    height: 3,
    backgroundColor: "#3498db",
    opacity: 0.5,
  },
  grid: {
    flexDirection: "row",
    gap: 16,
  },
  gridItem: {
    flex: 1,
  },
  gridLabel: {
    color: "#95a5a6",
    fontSize: 12,
    marginBottom: 4,
  },
  gridValue: {
    color: "#2c3e50",
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  ownerSection: {
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
    paddingTop: 16,
    marginTop: 8,
  },
  ownerLabel: {
    color: "#95a5a6",
    fontSize: 12,
    marginBottom: 8,
  },
  ownerInfo: {
    gap: 4,
  },
  ownerName: {
    color: "#2c3e50",
    fontSize: 16,
    fontWeight: "600",
  },
  ownerApartment: {
    color: "#7f8c8d",
    fontSize: 14,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
    alignItems: "center",
  },
  footerText: {
    color: "#bdc3c7",
    fontSize: 10,
    letterSpacing: 1,
  },
});

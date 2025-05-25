import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  getMyParkingDetails,
  getParkingDetails,
} from "@/services/parkingService";
import { ParkingCardType, ParkingType } from "@/utils/type/ParkingType";

// Constants
const STATUS_CONFIG = {
  active: { color: "#27ae60", text: "ĐANG HOẠT ĐỘNG", bg: "#e8f5e9" },
  inactive: { color: "#e74c3c", text: "VÔ HIỆU", bg: "#ffebee" },
  pending: { color: "#f39c12", text: "CHỜ DUYỆT", bg: "#fff3e0" },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

// Type Definitions
type ParkingCardProps = {
  item: ParkingCardType;
  owner: ParkingType;
};

// Components
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

const ParkingPassDesign: React.FC<ParkingCardProps> = React.memo(
  ({ item, owner }) => {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.cardId}>{item.id.slice(-6).toUpperCase()}</Text>
          <ParkingBadge status={item.status} />
        </View>

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

        <View style={styles.ownerRow}>
          <View>
            <Text style={styles.label}>Chủ sở hữu</Text>
            <Text style={styles.ownerName}>{owner.name}</Text>
          </View>
          <View style={styles.apartmentContainer}>
            <Text style={styles.label}>Căn hộ</Text>
            <Text style={styles.ownerApartment}>{owner.apartment}</Text>
          </View>
        </View>

        <Text style={styles.footerNote}>THẺ ĐỖ XE THÔNG MINH</Text>
      </View>
    );
  }
);

export const ParkingOverview: React.FC = () => {
  const [parkingData, setParkingData] = useState<ParkingType>({
    parkingId: "",
    apartment: "",
    name: "",
    numberOfMotorbike: 0,
    numberOfCar: 0,
    cards: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParkingData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const parkingInfo = await getMyParkingDetails();
      const parkingList = Array.isArray(parkingInfo)
        ? parkingInfo
        : [parkingInfo];

      // Fetch all cards in parallel
      const cardsPromises = parkingList.map((p) =>
        getParkingDetails(p.parkingId)
      );
      const allCards = await Promise.all(cardsPromises);

      setParkingData({
        ...parkingList[0],
        cards: allCards.flat(),
      });
    } catch (err) {
      console.error("Failed to fetch parking data:", err);
      setError("Không thể tải dữ liệu bãi đỗ xe");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParkingData();
  }, [fetchParkingData]);

  const renderItem = useCallback(
    ({ item }: { item: ParkingCardType }) => (
      <ParkingPassDesign item={item} owner={parkingData} />
    ),
    [parkingData]
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        {isLoading ? (
          <Text style={styles.emptyText}>Đang tải dữ liệu...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.emptyText}>
            Không có thẻ đỗ xe nào được đăng ký.
          </Text>
        )}
      </View>
    ),
    [isLoading, error]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={parkingData.cards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={fetchParkingData}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "#e74c3c",
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
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#34495e",
  },
  ownerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  apartmentContainer: {
    alignItems: "center",
    marginRight: 8,
  },
  ownerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  ownerApartment: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  footerNote: {
    textAlign: "center",
    fontSize: 12,
    color: "#bdc3c7",
    marginTop: 8,
    letterSpacing: 0.5,
  },
});

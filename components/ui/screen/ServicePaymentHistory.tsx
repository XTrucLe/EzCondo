import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ModalCustome from "../custome/ModalCustome";
import { getMyBooking } from "@/services/bookingService";
import { RegisteredService } from "@/utils/type/bookingType";
import { useLanguage } from "@/hooks/useLanguage";

export default function ServicePaymentHistory() {
  const { translation } = useLanguage.getState();

  const [bookings, setBookings] = useState<RegisteredService[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<RegisteredService | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBooking();
        setBookings(response);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCardPress = (item: RegisteredService) => {
    setSelectedBooking(item);
    setIsModalVisible(true);
  };

  const renderBookingCard = ({ item }: { item: RegisteredService }) => {
    const progress = calculateProgress(item.startDate, item.endDate);
    const statusConfig = getStatusConfig(item.status);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.headerRow}>
          <Text style={styles.serviceName} numberOfLines={1}>
            {item.serviceName}
          </Text>
          <View style={[styles.statusBadge, statusConfig.bgColor]}>
            <Text style={styles.statusText}>{statusConfig.label}</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <DateRow
            icon="play-circle-fill"
            date={item.startDate}
            lable={translation.startDate}
          />
          <DateRow
            icon="stop-circle"
            date={item.endDate}
            lable={translation.endDate}
          />
        </View>

        <ProgressBar
          progress={progress}
          duration={calculateDuration(item.startDate, item.endDate)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingCard}
        contentContainerStyle={styles.listContent}
      />

      <ModalCustome
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        data={selectedBooking ?? undefined}
      />
    </View>
  );
}

// Helper Components
const DateRow = ({
  icon,
  date,
  lable,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  date: string;
  lable?: string;
}) => (
  <View style={styles.dateRow}>
    <MaterialIcons name={icon} size={16} color="#4b5563" />
    {lable && <Text style={styles.dateText}>{lable} :</Text>}
    <Text style={styles.dateText}>{formatDate(date)}</Text>
  </View>
);

const ProgressBar = ({
  progress,
  duration,
}: {
  progress: number;
  duration: string;
}) => (
  <View style={styles.durationContainer}>
    <View style={styles.durationBar}>
      <View style={[styles.durationProgress, { width: `${progress}%` }]} />
    </View>
    <Text style={styles.durationText}>{duration}</Text>
  </View>
);

// Helper Functions
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();

const calculateProgress = (start: string, end: string) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now >= endDate) return 100;
  if (now <= startDate) return 0;

  const total = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  return Math.round((elapsed / total) * 100);
};

const calculateDuration = (start: string, end: string) => {
  const diffDays = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 7) return `${diffDays} days`;
  if (diffDays < 30) return `${Math.round(diffDays / 7)} weeks`;
  return `${Math.round(diffDays / 30)} months`;
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { label: "Completed", bgColor: styles.statusCompleted };
    case "in_use":
      return { label: "In Use", bgColor: styles.statusInUse };
    case "pending":
      return { label: "Pending", bgColor: styles.statusPending };
    case "cancelled":
      return { label: "Cancelled", bgColor: styles.statusCancelled };
    default:
      return { label: "Unknown", bgColor: styles.statusPending };
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusCompleted: {
    backgroundColor: "#ecfdf5",
  },
  statusInUse: {
    backgroundColor: "#e0f2fe",
  },
  statusPending: {
    backgroundColor: "#fffbeb",
  },
  statusCancelled: {
    backgroundColor: "#fee2e2",
  },
  dateContainer: {
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 8,
  },
  durationContainer: {
    marginTop: 8,
  },
  durationBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  durationProgress: {
    height: "100%",
    backgroundColor: "#10b981",
  },
  durationText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "right",
  },
});

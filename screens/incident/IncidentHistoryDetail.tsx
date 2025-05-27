import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useDateUtils from "@/hooks/useDateUtils";
import { IncidentType } from "@/components/ui/IncidentBox";
import { getIncidentImage } from "@/services/incidentService";

export default function IncidentHistoryDetail() {
  const route = useRoute();
  const { formatDate } = useDateUtils();
  const { incidentDetail } = route.params as { incidentDetail: IncidentType };
  const [incident, setIncident] = useState<IncidentType>(incidentDetail);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const getIncidentImages = async () => {
      try {
        const response = await getIncidentImage(incidentDetail.id);
        setIncident((prev) => ({ ...prev, images: response || [] }));
      } catch (error) {
        console.error("Lỗi khi lấy ảnh:", error);
      }
    };

    if (incidentDetail.id) getIncidentImages();
  }, [incidentDetail.id]);

  const getStatusColor = (status: IncidentType["status"]) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "in_progress":
        return "#3b82f6";
      case "resolved":
        return "#10b981";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getPriorityInfo = (priority: number) => {
    switch (priority) {
      case 1:
        return { label: "⚠️ Cao", color: "#ef4444" };
      case 2:
        return { label: "🔶 Trung bình", color: "#f59e0b" };
      case 3:
        return { label: "✅ Thấp", color: "#10b981" };
      default:
        return { label: "Bình thường", color: "#6b7280" };
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.title}>
          {incident.title.charAt(0).toUpperCase() + incident.title.slice(1)}
        </Text>

        {/* Status */}
        <View style={styles.row}>
          <Text style={styles.iconLabel}>📌 Trạng thái:</Text>
          <Text
            style={[
              styles.value,
              { color: getStatusColor(incident.status), fontWeight: "bold" },
            ]}
          >
            {incident.status.toUpperCase()}
          </Text>
        </View>

        {/* Priority */}
        <View style={styles.row}>
          <Text style={styles.iconLabel}>❗ Ưu tiên:</Text>
          <Text
            style={[
              styles.value,
              { color: getPriorityInfo(incident.priority).color },
            ]}
          >
            {getPriorityInfo(incident.priority).label}
          </Text>
        </View>

        {/* Type */}
        <View style={styles.row}>
          <Text style={styles.iconLabel}>📂 Loại sự cố:</Text>
          <Text style={styles.value}>{incident.type}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.iconLabel}>📝 Mô tả:</Text>
          <Text
            style={styles.description}
            numberOfLines={showFullDescription ? undefined : 4}
          >
            {incident.description}
          </Text>
          {incident.description.length > 100 && (
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.expandToggle}>
                {showFullDescription ? "Thu gọn ▲" : "Xem thêm ▼"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reported At */}
        <View style={styles.row}>
          <Text style={styles.iconLabel}>🕒 Ngày báo cáo:</Text>
          <Text style={styles.value}>
            {formatDate(new Date(incident.reportedAt))}
          </Text>
        </View>

        {/* Images */}
        {(incident.images ?? []).length > 0 && (
          <View style={styles.imageSection}>
            <Text style={styles.iconLabel}>🖼 Hình ảnh:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {(incident.images ?? []).map((image, index) => (
                <Image
                  key={image?.id ?? index}
                  source={{ uri: String(image?.imgPath) }}
                  style={styles.image}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  iconLabel: {
    width: 120,
    fontSize: 14,
    color: "#6b7280",
  },
  value: {
    flex: 1,
    fontSize: 15,
    color: "#1f2937",
  },
  section: {
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 20,
    marginTop: 4,
  },
  expandToggle: {
    marginTop: 6,
    color: "#3b82f6",
    fontSize: 14,
  },
  imageSection: {
    marginTop: 8,
  },
  image: {
    width: 130,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10,
  },
});

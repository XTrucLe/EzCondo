import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RegisteredService } from "@/utils/type/bookingType";
import { useRoute } from "@react-navigation/native";
import { ServiceDetailType } from "@/utils/type/serviceDetailType";
import { getServiceDetail, getServiceImages } from "@/services/servicesService";
import { SlideShow } from "@/components/ui/SlideShow";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import useDateUtils from "@/hooks/useDateUtils";
import { formatVND } from "@/hooks/useFormat";
import { useLanguage } from "@/hooks/useLanguage";

export default function ServiceUsingDetailScreen() {
  const route = useRoute();
  const { serviceData } = route.params as { serviceData: RegisteredService };
  const { formatDate } = useDateUtils();
  const { translation } = useLanguage();
  const [serviceDetail, setServiceDetail] = React.useState<ServiceDetailType>();

  const getService = async () => {
    try {
      const response = await getServiceDetail(serviceData.serviceName);
      const detail = response[0];
      if (detail && detail.id) {
        const images = await getServiceImages(detail.id);
        setServiceDetail({
          ...detail,
          images: images,
        });
      } else {
        setServiceDetail(detail);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  React.useEffect(() => {
    getService();
  }, []);

  const calculateMonthsUsed = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.round(end.getMonth() - start.getMonth());
  };

  return (
    <View style={styles.container}>
      {/* Ảnh slide */}
      {(serviceDetail?.images?.length ?? 0) > 0 && (
        <View style={styles.imageBox}>
          <SlideShow item={serviceDetail?.images || []} time={6000} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{serviceDetail?.serviceName}</Text>
              <Text style={styles.subTitle}>
                {serviceDetail?.typeOfMonth
                  ? translation.monthlyPackage
                  : translation.yearlyPackage}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                serviceDetail?.status === "active"
                  ? styles.statusActive
                  : styles.statusInactive,
              ]}
            >
              <Icon
                name={
                  serviceDetail?.status === "active" ? "check-circle" : "close"
                }
                size={14}
                color="#fff"
              />
              <Text style={styles.statusText}>
                {serviceDetail?.status === "active"
                  ? translation.active
                  : translation.inactive}
              </Text>
            </View>
          </View>

          {/* Dòng thống kê */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{translation.timeUsing}</Text>
              <Text style={styles.metricValue}>
                {calculateMonthsUsed(
                  serviceData.startDate,
                  serviceData.endDate
                )}{" "}
                {translation.month}
              </Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{translation.totalCost}</Text>
              <Text style={styles.metricValue}>
                {formatVND(
                  (serviceDetail?.priceOfMonth ||
                    serviceDetail?.priceOfYear ||
                    0) *
                    calculateMonthsUsed(
                      serviceData.startDate,
                      serviceData.endDate
                    )
                )}
              </Text>
            </View>
          </View>

          {/* Grid thông tin */}
          <View style={styles.infoGrid}>
            <InfoBox
              icon="calendar"
              label={translation.startDate}
              value={formatDate(new Date(serviceData.startDate))}
            />
            <InfoBox
              icon="calendar-check"
              label={translation.endDate}
              value={formatDate(new Date(serviceData.endDate))}
            />
            <InfoBox
              icon="cash"
              label={translation.totalCost}
              value={formatVND(
                serviceDetail?.priceOfMonth || serviceDetail?.priceOfYear || 0
              )}
            />
            <InfoBox
              icon="repeat"
              label={translation.renewalPeriod}
              value={
                serviceDetail?.typeOfMonth
                  ? translation.monthly
                  : translation.yearly
              }
            />
          </View>

          {/* Mô tả */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>
              {translation.descriptionDetail}
            </Text>
            <Text style={styles.descriptionText}>
              {serviceDetail?.description || translation.noData}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const InfoBox = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Icon.glyphMap;
  label: string;
  value: string;
}) => (
  <View
    style={{
      width: "47%",
      marginBottom: 16,
      backgroundColor: "#F8FAFC",
      padding: 12,
      borderRadius: 12,
    }}
  >
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
    >
      <Icon name={icon} size={18} color="#4A6FA5" style={{ marginRight: 6 }} />
      <Text style={{ fontSize: 13, color: "#6B7280" }}>{label}</Text>
    </View>
    <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  scrollContainer: {
    padding: 4,
  },
  imageBox: {
    height: 220,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E3A59",
  },
  subTitle: {
    fontSize: 14,
    color: "#6E7B91",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "500",
  },
  statusActive: {
    backgroundColor: "#28C76F",
  },
  statusInactive: {
    backgroundColor: "#EA5455",
  },
  metricsRow: {
    flexDirection: "row",
    backgroundColor: "#F1F4F8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  metricItem: {
    flex: 1,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 13,
    color: "#6E7B91",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E3A59",
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: "#CED6E0",
    marginHorizontal: 12,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  descriptionBox: {
    borderTopWidth: 1,
    borderTopColor: "#E5EAF2",
    paddingTop: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E3A59",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#4A5568",
    lineHeight: 20,
  },
});

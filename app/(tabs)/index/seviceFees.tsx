import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import FeeCard from "@/components/ui/FeeCard";
import { getElectricFees } from "@/services/feeServices";
import { useRoute } from "@react-navigation/native";
import { getWaterFee } from "@/services/feeService";
import { ElectricFee, WaterFee } from "@/utils/type/FeeType";

export default function BillListScreen() {
  const route = useRoute<any>();
  const mode = route.params?.mode || "electric";

  const [data, setData] = React.useState<(ElectricFee | WaterFee)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === "water") {
          const response = await getWaterFee();
          setData(response);
        } else {
          const response = await getElectricFees();
          setData(response);
        }
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
    };

    fetchData();
  }, [mode]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) =>
          "electricBillId" in item
            ? String(item.electricBillId)
            : "waterBillId" in item
            ? String(item.waterBillId)
            : ""
        }
        renderItem={({ item }) => <FeeCard item={item} mode={mode} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  listContent: {
    padding: 16,
  },
});

import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import ServiceOverview from "@/components/ui/screen/ServiceOverview";
import ServicePaymentHistory from "@/components/ui/screen/ServicePaymentHistory";

const initialLayout = { width: Dimensions.get("window").width };

export default function ServiceScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "Dịch vụ" },
    { key: "payment_history", title: "Dịch vụ sử dụng" },
  ]);

  const renderScene = SceneMap({
    all: ServiceOverview,
    payment_history: ServicePaymentHistory,
  });
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#007aff" }}
          style={{ backgroundColor: "#fff" }}
          inactiveColor="#000"
          activeColor="#3674B5"
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
});

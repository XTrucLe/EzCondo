import React, { useMemo, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import ServiceOverview from "@/components/ui/screen/ServiceOverview";
import ServicePaymentHistory from "@/components/ui/screen/ServicePaymentHistory";
import { useLanguage } from "@/hooks/useLanguage";

const initialLayout = { width: Dimensions.get("window").width };

export default function ServiceScreen() {
  const [index, setIndex] = useState(0);
  const { translation } = useLanguage();
  const routes = useMemo(
    () => [
      { key: "all", title: translation.serviceAvailable },
      { key: "payment_history", title: translation.serviceInUse },
    ],
    [translation]
  );

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
          style={{ backgroundColor: "#fff", paddingTop: 20 }}
          inactiveColor="#000"
          activeColor="#3674B5"
        />
      )}
    />
  );
}

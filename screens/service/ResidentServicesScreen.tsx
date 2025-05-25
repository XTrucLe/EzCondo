import React from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import ServiceOverview from "./ServiceOverviewScreen";
import ServiceUsingScreen from "./ServiceUsingScreen";
import { useLanguage } from "@/hooks/useLanguage";

const renderScene = SceneMap({
  overview: ServiceOverview,
  serviceUsing: ServiceUsingScreen,
});
export default function ResidentServicesScreen() {
  const { translation } = useLanguage();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "overview", title: translation.serviceAvailable },
    { key: "serviceUsing", title: translation.serviceInUse },
  ]);
  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: 1000 }}
      style={{ backgroundColor: "#fff" }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#007aff" }}
          style={{ backgroundColor: "#fff", paddingTop: 20 }}
          inactiveColor="#000"
          activeColor="#3674B5"
        />
      )}
      tabBarPosition="top"
      lazy
      lazyPreloadDistance={0}
    />
  );
}

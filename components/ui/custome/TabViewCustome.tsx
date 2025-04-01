import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

interface TabRoute {
  key: string;
  title: string;
  component: React.FC;
}

interface CustomTabViewProps {
  routes: TabRoute[];
}

const CustomTabView: React.FC<CustomTabViewProps> = ({ routes }) => {
  const layout = Dimensions.get("window");
  const [index, setIndex] = useState(0);

  const sceneMap = Object.fromEntries(
    routes.map((route) => [route.key, route.component])
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap(sceneMap)}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "white" }}
          style={styles.tabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#6200ee",
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomTabView;

import React from "react";
import { Tabs } from "expo-router";
import { CustomTabBar } from "@/components/ui/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="watch"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="watch"
        options={{
          title: "Watch",
        }}
      />
      <Tabs.Screen
        name="media"
        options={{
          title: "Media Library",
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
        }}
      />
    </Tabs>
  );
}

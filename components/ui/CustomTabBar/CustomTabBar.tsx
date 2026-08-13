import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabBarItem } from "./TabBarItem";
import type { CustomTabBarProps } from "./types";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-dark rounded-t-[36px] overflow-hidden"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      <View className="h-[75px] flex-row items-center justify-around px-2">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key] ?? {};
          const label =
            options?.tabBarLabel !== undefined
              ? String(options.tabBarLabel)
              : options?.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const isDisabled = route.name !== "watch";

          return (
            <TabBarItem
              key={route.key}
              routeName={route.name}
              label={label}
              isFocused={isFocused}
              disabled={isDisabled}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

export default CustomTabBar;

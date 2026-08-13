import React from "react";
import { Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { TabBarItemProps } from "./types";

export function TabBarItem({
  routeName,
  label,
  isFocused,
  disabled = false,
  onPress,
  onLongPress,
}: TabBarItemProps) {
  const activeColor = "#FFFFFF";
  const inactiveColor = "#827D88";
  const iconColor = isFocused ? activeColor : inactiveColor;
  const iconSize = 22;

  const renderIcon = () => {
    switch (routeName) {
      case "dashboard":
        return (
          <MaterialCommunityIcons
            name="view-grid"
            size={iconSize}
            color={iconColor}
          />
        );
      case "watch":
      case "index":
        return (
          <MaterialCommunityIcons
            name="play-box"
            size={iconSize + 2}
            color={iconColor}
          />
        );
      case "media":
        return (
          <MaterialCommunityIcons
            name="card-multiple"
            size={iconSize}
            color={iconColor}
          />
        );
      case "more":
        return (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={iconSize + 2}
            color={iconColor}
          />
        );
      default:
        return (
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={iconSize}
            color={iconColor}
          />
        );
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      onLongPress={disabled ? undefined : onLongPress}
      className="flex-1 items-center justify-center py-2"
    >
      {renderIcon()}
      <Text
        style={{ color: iconColor }}
        className={`mt-1 text-[10px] leading-3 ${
          isFocused ? "font-poppins-semibold" : "font-poppins"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default TabBarItem;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { HallCardProps } from "./types";

export function HallCard({
  time,
  hallName,
  price,
  bonus,
  isSelected = false,
  onSelect,
}: HallCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      className={`w-[250px] rounded-[16px] border bg-white p-4 shadow-sm ${
        isSelected ? "border-primary" : "border-lightGrey/80"
      }`}
    >
      {/* Top Header: Time + Hall Name */}
      <View className="mb-3 flex-row items-baseline gap-2">
        <Text className="font-poppins-semibold text-sm text-dark">
          {time}
        </Text>
        <Text className="font-poppins text-xs text-muted" numberOfLines={1}>
          {hallName}
        </Text>
      </View>

      {/* Hall Mini Screen Visualization Card */}
      <View className="mb-4 h-[120px] w-full items-center justify-center rounded-[10px] bg-background border border-lightGrey/40 p-2">
        <View className="h-1.5 w-3/4 rounded-full bg-primary/40 mb-3" />
        <View className="gap-1 items-center">
          <View className="flex-row gap-1">
            <View className="h-2 w-3 rounded-sm bg-lightGrey" />
            <View className="h-2 w-3 rounded-sm bg-lightGrey" />
            <View className="h-2 w-3 rounded-sm bg-primary" />
            <View className="h-2 w-3 rounded-sm bg-lightGrey" />
          </View>
          <View className="flex-row gap-1">
            <View className="h-2 w-3 rounded-sm bg-lightGrey" />
            <View className="h-2 w-3 rounded-sm bg-primary" />
            <View className="h-2 w-3 rounded-sm bg-primary" />
            <View className="h-2 w-3 rounded-sm bg-lightGrey" />
          </View>
        </View>
      </View>

      {/* Price & Bonus Info */}
      <View className="flex-row items-center justify-between">
        <Text className="font-poppins text-xs text-muted">
          From <Text className="font-poppins-semibold text-dark">${price}</Text>
        </Text>
        <Text className="font-poppins text-xs text-muted">
          or <Text className="font-poppins-semibold text-dark">{bonus} bonus</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default HallCard;

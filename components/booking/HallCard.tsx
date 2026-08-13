import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MiniSeatMap } from "./MiniSeatMap";

interface HallCardProps {
  time: string;
  hallName: string;
  price: number;
  bonus: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function HallCard({
  time,
  hallName,
  price,
  bonus,
  isSelected,
  onSelect,
}: HallCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onSelect}
      className="w-[245px]"
    >
      <View className="mb-2 flex-row items-baseline">
        <Text className="font-poppins-semibold text-sm text-dark">{time}</Text>
        <Text className="ml-2 font-poppins text-xs text-muted font-normal">
          {hallName}
        </Text>
      </View>

      <View
        className={`mb-3 overflow-hidden rounded-[16px] border bg-white p-3 shadow-xs ${
          isSelected ? "border-primary" : "border-lightGrey/60"
        }`}
      >
        <MiniSeatMap />
      </View>

      <Text className="font-poppins text-xs text-muted">
        From{" "}
        <Text className="font-poppins-bold text-dark">{price}$</Text>
        {" or "}
        <Text className="font-poppins-bold text-dark">{bonus} bonus</Text>
      </Text>
    </TouchableOpacity>
  );
}

export default HallCard;

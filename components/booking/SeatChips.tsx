import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { SeatChipsProps } from "./types";

export function SeatChips({
  selectedSeats,
  onRemoveSeat,
}: SeatChipsProps) {
  if (selectedSeats.length === 0) return null;

  return (
    <View className="py-2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
      >
        {selectedSeats.map((seat) => (
          <View
            key={seat.id}
            className="flex-row items-center rounded-full bg-lightGrey/50 px-3 py-1.5"
          >
            <Text className="mr-1.5 font-poppins-semibold text-xs text-dark">
              {seat.row} / {seat.col}
            </Text>
            <Text className="mr-2 font-poppins text-[10px] text-muted">
              ${seat.price}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onRemoveSeat(seat.id)}
              className="p-0.5"
            >
              <Ionicons name="close" size={14} color="#827D88" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default SeatChips;

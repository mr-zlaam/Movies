import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { SeatItem } from "./SeatGrid";

interface SeatChipsProps {
  selectedSeats: SeatItem[];
  onRemoveSeat: (seatId: string) => void;
}

export function SeatChips({ selectedSeats, onRemoveSeat }: SeatChipsProps) {
  if (selectedSeats.length === 0) return null;

  return (
    <View className="px-6 py-2 bg-white">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      >
        {selectedSeats.map((seat) => (
          <View
            key={seat.id}
            className="flex-row items-center rounded-[8px] bg-background px-3 py-1.5 border border-lightGrey/40"
          >
            <Text className="font-poppins-semibold text-xs text-dark mr-1">
              {seat.col}
            </Text>
            <Text className="font-poppins text-xs text-muted mr-2">
              / {seat.row} row
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove seat ${seat.col} row ${seat.row}`}
              onPress={() => onRemoveSeat(seat.id)}
              hitSlop={8}
            >
              <Ionicons name="close" size={14} color="#2E2739" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default SeatChips;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SeatIcon } from "./SeatIcon";
import type { SeatRowProps } from "./types";

export function SeatRow({
  rowIndex,
  rowSeats,
  selectedSeatIds,
  onToggleSeat,
}: SeatRowProps) {
  const leftSeats = rowSeats.filter((s) => s.section === "left");
  const centerSeats = rowSeats.filter((s) => s.section === "center");
  const rightSeats = rowSeats.filter((s) => s.section === "right");

  return (
    <View className="flex-row items-center gap-3">
      {/* Row Number */}
      <Text className="w-3 font-poppins-semibold text-[10px] text-muted text-center">
        {rowIndex}
      </Text>

      {/* Left Section */}
      <View className="flex-row gap-1">
        {leftSeats.map((seat) => {
          const isSelected = selectedSeatIds.includes(seat.id);
          return (
            <TouchableOpacity
              key={seat.id}
              activeOpacity={0.7}
              onPress={() => onToggleSeat(seat)}
            >
              <SeatIcon status={seat.status} isSelected={isSelected} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Center Section */}
      <View className="flex-row gap-1">
        {centerSeats.map((seat) => {
          const isSelected = selectedSeatIds.includes(seat.id);
          return (
            <TouchableOpacity
              key={seat.id}
              activeOpacity={0.7}
              onPress={() => onToggleSeat(seat)}
            >
              <SeatIcon status={seat.status} isSelected={isSelected} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Right Section */}
      <View className="flex-row gap-1">
        {rightSeats.map((seat) => {
          const isSelected = selectedSeatIds.includes(seat.id);
          return (
            <TouchableOpacity
              key={seat.id}
              activeOpacity={0.7}
              onPress={() => onToggleSeat(seat)}
            >
              <SeatIcon status={seat.status} isSelected={isSelected} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default SeatRow;

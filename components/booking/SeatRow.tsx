import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SeatIcon } from "./SeatIcon";
import type { SeatItem, SeatStatus } from "./SeatGrid";

interface SeatRowProps {
  rowIndex: number;
  rowSeats: SeatItem[];
  selectedSeatIds: string[];
  onToggleSeat: (seat: SeatItem) => void;
}

const getSeatColor = (status: SeatStatus, isSelected: boolean) => {
  if (isSelected) return "#CD9D0F"; // Selected Seat (Golden Yellow)
  switch (status) {
    case "available":
      return "#61C3F2"; // Regular Seat (Cyan/Light Blue)
    case "vip":
    case "executive":
      return "#564CA3"; // VIP Seat (Dark Purple)
    case "reserved":
    default:
      return "#DBDBDF"; // Unavailable (Light Grey)
  }
};

export function SeatRow({
  rowIndex,
  rowSeats,
  selectedSeatIds,
  onToggleSeat,
}: SeatRowProps) {
  const leftSeats = rowSeats.filter((s) => s.section === "left");
  const centerSeats = rowSeats.filter((s) => s.section === "center");
  const rightSeats = rowSeats.filter((s) => s.section === "right");

  const renderSection = (seatsList: SeatItem[]) => (
    <View className="flex-row gap-1.5">
      {seatsList.map((seat) => {
        const isSelected = selectedSeatIds.includes(seat.id);
        const isDisabled = seat.status === "reserved";
        const seatColor = getSeatColor(seat.status, isSelected);
        return (
          <TouchableOpacity
            key={seat.id}
            disabled={isDisabled}
            activeOpacity={0.7}
            onPress={() => onToggleSeat(seat)}
            className="p-[1px]"
          >
            <SeatIcon color={seatColor} size={12} />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View className="flex-row items-center">
      {/* Row Number Label */}
      <View className="w-5 items-center mr-2">
        <Text className="font-poppins-medium text-[9px] text-dark/70">
          {rowIndex}
        </Text>
      </View>

      {/* Sections */}
      <View className="mr-3">{renderSection(leftSeats)}</View>
      <View className="mr-3">{renderSection(centerSeats)}</View>
      <View>{renderSection(rightSeats)}</View>
    </View>
  );
}

export default SeatRow;

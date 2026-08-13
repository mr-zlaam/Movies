import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { SeatRow } from "./SeatRow";
import type { SeatItem, SeatGridProps } from "./types";

export type { SeatItem, SeatStatus } from "./types";

export function SeatGrid({
  seats,
  selectedSeatIds,
  onToggleSeat,
}: SeatGridProps) {
  const [zoomScale, setZoomScale] = useState(1.0);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.15, 1.35));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.15, 0.75));
  };

  // Group seats by row
  const rowsMap = seats.reduce<Record<number, SeatItem[]>>((acc, seat) => {
    const list = acc[seat.row];
    if (list) {
      list.push(seat);
    } else {
      acc[seat.row] = [seat];
    }
    return acc;
  }, {});

  const rowIndices = Object.keys(rowsMap).map(Number).sort((a, b) => a - b);

  return (
    <View className="relative flex-1 bg-background justify-center items-center">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{ transform: [{ scale: zoomScale }] }}
          className="items-center justify-center py-6"
        >
          {/* Cinema Curved Screen Header */}
          <View className="mb-6 items-center">
            <Svg height="20" width="280" viewBox="0 0 280 20">
              <Path
                d="M 10 16 Q 140 2 270 16"
                fill="none"
                stroke="#61C3F2"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
            <Text className="mt-1 font-poppins-medium text-[9px] text-muted tracking-widest uppercase">
              SCREEN
            </Text>
          </View>

          {/* Rows of Seats */}
          <View className="gap-2">
            {rowIndices.map((rowIndex) => (
              <SeatRow
                key={`row-${rowIndex}`}
                rowIndex={rowIndex}
                rowSeats={rowsMap[rowIndex] ?? []}
                selectedSeatIds={selectedSeatIds}
                onToggleSeat={onToggleSeat}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Zoom Controls (+ / -) */}
      <View className="absolute bottom-4 right-5 flex-row items-center gap-2">
        <Pressable
          onPress={handleZoomIn}
          className="h-9 w-9 items-center justify-center rounded-full bg-white shadow-md active:bg-lightGrey/20"
        >
          <Ionicons name="add" size={18} color="#2E2739" />
        </Pressable>
        <Pressable
          onPress={handleZoomOut}
          className="h-9 w-9 items-center justify-center rounded-full bg-white shadow-md active:bg-lightGrey/20"
        >
          <Ionicons name="remove" size={18} color="#2E2739" />
        </Pressable>
      </View>

      {/* Bottom Horizontal Divider */}
      <View className="h-[2px] w-full bg-lightGrey/60" />
    </View>
  );
}

export default SeatGrid;

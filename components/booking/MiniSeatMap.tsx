import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export function MiniSeatMap() {
  const rows = 9;
  const cols = 14;

  const getDotColor = (r: number, c: number) => {
    if (r === 2 && (c === 4 || c === 9)) return "#E26CA5"; // Pink
    if (r === 3 && (c === 6 || c === 7)) return "#564CA3"; // Purple
    if (r === 4 && (c === 2 || c === 11)) return "#15D2BC"; // Teal
    if ((r + c) % 3 === 0) return "#61C3F2"; // Primary Blue
    return "#DBDBDF"; // Light Grey
  };

  return (
    <View className="h-[145px] w-full items-center justify-center rounded-[12px] bg-lightGrey/20 p-3">
      {/* Curved Screen Line at Top */}
      <Svg height="14" width="160" viewBox="0 0 160 14" className="mb-2">
        <Path
          d="M 10 12 Q 80 2 150 12"
          fill="none"
          stroke="#61C3F2"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>

      {/* Mini Dot Grid */}
      <View className="gap-1 items-center">
        {Array.from({ length: rows }).map((_, rIndex) => (
          <View key={`mini-row-${rIndex}`} className="flex-row gap-1">
            {Array.from({ length: cols }).map((_, cIndex) => (
              <View
                key={`mini-dot-${rIndex}-${cIndex}`}
                style={{
                  backgroundColor: getDotColor(rIndex, cIndex),
                }}
                className="h-[4px] w-[4px] rounded-[1px]"
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export default MiniSeatMap;

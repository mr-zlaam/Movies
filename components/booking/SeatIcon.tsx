import React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import type { SeatIconProps } from "./types";

export function SeatIcon({
  status,
  isSelected = false,
  color,
  size = 14,
}: SeatIconProps) {
  let fillColor = color || "#A6A6A6";

  if (!color) {
    if (isSelected) {
      fillColor = "#CD9D0F"; // selected gold
    } else {
      switch (status) {
        case "available":
          fillColor = "#61C3F2"; // cyan available
          break;
        case "reserved":
          fillColor = "#DBDBDF"; // unavailable light grey
          break;
        case "vip":
          fillColor = "#564CA3"; // purple VIP
          break;
        case "executive":
          fillColor = "#E26CA5"; // pink executive
          break;
        default:
          fillColor = "#61C3F2";
      }
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Rect
        x="2"
        y="1"
        width="12"
        height="11"
        rx="2"
        fill={fillColor}
      />
      <Path
        d="M1 13C1 12.4477 1.44772 12 2 12H14C14.5523 12 15 12.4477 15 13V15H1V13Z"
        fill={fillColor}
      />
    </Svg>
  );
}

export default SeatIcon;

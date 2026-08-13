import React from "react";
import Svg, { Path } from "react-native-svg";

interface SeatIconProps {
  color: string;
  size?: number;
}

export function SeatIcon({ color, size = 12 }: SeatIconProps) {
  const height = Math.round((size * 11) / 12);

  return (
    <Svg width={size} height={height} viewBox="0 0 12 11" fill="none">
      {/* Chair Backrest */}
      <Path
        d="M 2 1.5 C 2 0.7 2.7 0 3.5 0 L 8.5 0 C 9.3 0 10 0.7 10 1.5 L 10 6.5 C 10 7.3 9.3 8 8.5 8 L 3.5 8 C 2.7 8 2 7.3 2 6.5 Z"
        fill={color}
      />
      {/* Chair Seat Lip / Armrest Base */}
      <Path
        d="M 1 9 C 1 8.4 1.4 8 2 8 L 10 8 C 10.6 8 11 8.4 11 9 L 11 10 C 11 10.6 10.6 11 10 11 L 2 11 C 1.4 11 1 10.6 1 10 Z"
        fill={color}
        opacity={0.8}
      />
    </Svg>
  );
}

export default SeatIcon;

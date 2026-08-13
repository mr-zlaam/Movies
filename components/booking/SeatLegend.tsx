import React from "react";
import { View, Text } from "react-native";
import { SeatIcon } from "./SeatIcon";

export function SeatLegend() {
  return (
    <View className="px-6 py-4 bg-white">
      {/* 2x2 Grid matching Figma design */}
      <View className="flex-row mb-3">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3">
            <SeatIcon color="#CD9D0F" size={14} />
          </View>
          <Text className="font-poppins-medium text-xs text-muted">
            Selected
          </Text>
        </View>

        <View className="flex-1 flex-row items-center">
          <View className="mr-3">
            <SeatIcon color="#DBDBDF" size={14} />
          </View>
          <Text className="font-poppins-medium text-xs text-muted">
            Not available
          </Text>
        </View>
      </View>

      <View className="flex-row">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3">
            <SeatIcon color="#564CA3" size={14} />
          </View>
          <Text className="font-poppins-medium text-xs text-muted">
            VIP (150$)
          </Text>
        </View>

        <View className="flex-1 flex-row items-center">
          <View className="mr-3">
            <SeatIcon color="#61C3F2" size={14} />
          </View>
          <Text className="font-poppins-medium text-xs text-muted">
            Regular (50 $)
          </Text>
        </View>
      </View>
    </View>
  );
}

export default SeatLegend;

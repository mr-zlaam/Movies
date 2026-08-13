import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { WatchHeaderProps } from "./types";

export function WatchHeader({ onSearchPress }: WatchHeaderProps) {
  return (
    <View className="flex-row items-center justify-between bg-white px-5 py-4">
      <Text className="font-poppins-medium text-lg text-dark">Watch</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search movies"
        onPress={onSearchPress}
        className="p-1"
      >
        <Ionicons name="search-outline" size={20} color="#2E2739" />
      </Pressable>
    </View>
  );
}

export default WatchHeader;

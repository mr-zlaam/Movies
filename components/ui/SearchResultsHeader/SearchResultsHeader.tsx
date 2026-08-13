import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { SearchResultsHeaderProps } from "./types";

export function SearchResultsHeader({
  count,
  onBackPress,
}: SearchResultsHeaderProps) {
  return (
    <View className="flex-row items-center bg-white px-5 py-4">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBackPress}
        className="p-1"
      >
        <Ionicons name="chevron-back" size={24} color="#2E2739" />
      </Pressable>
      <Text className="ml-4 font-poppins-medium text-base text-dark">
        {count} Results Found
      </Text>
    </View>
  );
}

export default SearchResultsHeader;

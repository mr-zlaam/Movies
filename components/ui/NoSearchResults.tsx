import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NoSearchResultsProps } from "./NoSearchResults/types";

export function NoSearchResults({ query }: NoSearchResultsProps) {
  return (
    <View className="flex-1 items-center justify-center pt-16 px-6">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-lightGrey/40">
        <Ionicons name="search-outline" size={32} color="#827D88" />
      </View>
      <Text className="mb-1 font-poppins-semibold text-lg text-dark text-center">
        No Results Found
      </Text>
      <Text className="font-poppins text-xs text-muted text-center leading-5">
        We couldn’t find any movies matching &quot;{query}&quot;. Try searching for another title or genre.
      </Text>
    </View>
  );
}

export default NoSearchResults;

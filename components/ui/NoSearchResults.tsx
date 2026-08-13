import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NoSearchResultsProps {
  query: string;
}

export function NoSearchResults({ query }: NoSearchResultsProps) {
  return (
    <View className="flex-1 items-center justify-center pt-20 px-6">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-lightGrey/40">
        <Ionicons name="search" size={28} color="#827D88" />
      </View>
      <Text className="font-poppins-semibold text-lg text-dark">
        No Results Found
      </Text>
      <Text className="mt-1 font-poppins text-xs text-muted text-center leading-5">
        {`We couldn't find any movies matching "${query}". Try searching for something else.`}
      </Text>
    </View>
  );
}

export default NoSearchResults;

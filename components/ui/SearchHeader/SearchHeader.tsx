import React from "react";
import { View, TextInput, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { SearchHeaderProps } from "./types";

export function SearchHeader({
  value,
  onChangeText,
  onClear,
  autoFocus = true,
}: SearchHeaderProps) {
  return (
    <View className="bg-white px-5 py-4">
      <View className="h-[52px] flex-row items-center rounded-full bg-lightGrey/50 px-5">
        <Ionicons name="search-outline" size={18} color="#827D88" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          placeholder="TV shows, movies and more"
          placeholderTextColor="#827D88"
          style={{
            textAlignVertical: "center",
            ...(Platform.OS === "android" ? { includeFontPadding: false } : {}),
            paddingTop: 0,
            paddingBottom: 0,
          }}
          className="ml-3 flex-1 h-full font-poppins text-sm text-dark"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={onClear}
          className="p-1"
        >
          <Ionicons name="close" size={20} color="#2E2739" />
        </Pressable>
      </View>
    </View>
  );
}

export default SearchHeader;

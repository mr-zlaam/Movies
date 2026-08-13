import React from "react";
import { View, Text } from "react-native";
import type { GenreTagProps } from "./types";

const GENRE_BG_CLASSES = [
  "bg-teal",
  "bg-pink",
  "bg-purple",
  "bg-yellow",
];

export function GenreTag({ name, index = 0 }: GenreTagProps) {
  const bgClass = GENRE_BG_CLASSES[index % GENRE_BG_CLASSES.length];

  return (
    <View className={`rounded-full px-3.5 py-1.5 ${bgClass}`}>
      <Text className="font-poppins-semibold text-xs text-white">
        {name}
      </Text>
    </View>
  );
}

export default GenreTag;

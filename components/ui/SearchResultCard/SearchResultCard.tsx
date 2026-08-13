import React, { memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { SearchResultCardProps } from "./types";

export const SearchResultCard = memo(function SearchResultCard({
  movie,
  onPress,
  onMorePress,
}: SearchResultCardProps) {
  const handlePress = () => {
    onPress?.(movie);
  };

  const handleMore = () => {
    onMorePress?.(movie);
  };

  const primaryGenre = movie.genres[0] ?? "Movie";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${movie.title}`}
      onPress={handlePress}
      className="mb-4 flex-row items-center justify-between active:opacity-90"
    >
      <View className="relative h-[83px] w-[130px] overflow-hidden rounded-[10px] bg-lightGrey">
        <Image
          source={{ uri: movie.posterUrl }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
        />
      </View>

      <View className="ml-4 flex-1 justify-center">
        <Text
          numberOfLines={1}
          className="font-poppins-medium text-base text-dark"
        >
          {movie.title}
        </Text>
        <Text className="mt-1 font-poppins text-xs text-muted/70">
          {primaryGenre}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="More options"
        onPress={handleMore}
        className="p-2"
      >
        <Ionicons name="ellipsis-horizontal" size={20} color="#61C3F2" />
      </Pressable>
    </Pressable>
  );
});

export default SearchResultCard;

import React, { memo } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { MovieCardProps } from "./types";

export const MovieCard = memo(function MovieCard({
  movie,
  onPress,
}: MovieCardProps) {
  const handlePress = () => {
    onPress?.(movie);
  };

  const imageSource = movie.backdropUrl || movie.posterUrl;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View details for ${movie.title}`}
      onPress={handlePress}
      className="relative mb-5 h-[180px] w-full overflow-hidden rounded-[10px] bg-lightGrey shadow-md active:opacity-95"
    >
      <Image
        source={{ uri: imageSource }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        className="absolute bottom-0 left-0 right-0 h-24 justify-end px-5 pb-4"
      >
        <Text
          numberOfLines={1}
          className="font-poppins-semibold text-lg text-white"
        >
          {movie.title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
});

export default MovieCard;

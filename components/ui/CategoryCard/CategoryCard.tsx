import React, { memo } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { CategoryCardProps } from "./types";

export const CategoryCard = memo(function CategoryCard({
  category,
  onPress,
}: CategoryCardProps) {
  const handlePress = () => {
    onPress?.(category);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${category.name} movies`}
      onPress={handlePress}
      className="relative h-[100px] flex-1 overflow-hidden rounded-[10px] bg-lightGrey active:opacity-90"
    >
      <Image
        source={{ uri: category.imageUrl }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.65)"]}
        className="absolute inset-0 justify-end p-4"
      >
        <Text
          numberOfLines={1}
          className="font-poppins-semibold text-base text-white"
        >
          {category.name}
        </Text>
      </LinearGradient>
    </Pressable>
  );
});

export default CategoryCard;

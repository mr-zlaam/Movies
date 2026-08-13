import React from "react";
import { View } from "react-native";
import { Skeleton } from "./Skeleton";

export function SearchResultCardSkeleton() {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Skeleton className="h-[83px] w-[130px] rounded-[10px]" />
      <View className="ml-4 flex-1 justify-center">
        <Skeleton className="h-5 w-3/4 rounded-md mb-2" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </View>
      <Skeleton className="h-5 w-5 rounded-full mr-2" />
    </View>
  );
}

export default SearchResultCardSkeleton;

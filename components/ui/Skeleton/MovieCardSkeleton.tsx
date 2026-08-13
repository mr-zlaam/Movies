import React from "react";
import { View } from "react-native";
import { Skeleton } from "./Skeleton";

export function MovieCardSkeleton() {
  return (
    <View className="mb-5 h-[180px] w-full overflow-hidden rounded-[10px] bg-lightGrey/40 p-4 justify-end">
      <Skeleton className="h-[180px] w-full absolute inset-0" />
      <Skeleton className="h-6 w-1/2 rounded-md mb-2" />
    </View>
  );
}

export default MovieCardSkeleton;

import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SearchResultCard } from "@/components/ui/SearchResultCard";
import { SearchResultCardSkeleton } from "@/components/ui/Skeleton";
import { NoSearchResults } from "@/components/ui/NoSearchResults";
import type { Movie } from "@/constants/mockMovies";

interface WatchSearchResultsProps {
  query: string;
  isSearchLoading: boolean;
  searchResults: Movie[];
  isSubmitted: boolean;
  onMoviePress: (movie: Movie) => void;
  onMorePress: () => void;
}

export function WatchSearchResults({
  query,
  isSearchLoading,
  searchResults,
  isSubmitted,
  onMoviePress,
  onMorePress,
}: WatchSearchResultsProps) {
  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <SearchResultCard
        movie={item}
        onPress={onMoviePress}
        onMorePress={onMorePress}
      />
    ),
    [onMoviePress, onMorePress]
  );

  if (isSearchLoading) {
    return (
      <View className="pt-5">
        {[1, 2, 3, 4].map((key) => (
          <SearchResultCardSkeleton key={key} />
        ))}
      </View>
    );
  }

  if (searchResults.length === 0) {
    return <NoSearchResults query={query} />;
  }

  return (
    <FlatList
      key="search-results-list"
      data={searchResults}
      keyExtractor={(item) => item.id}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      windowSize={5}
      removeClippedSubviews={true}
      ListHeaderComponent={
        !isSubmitted ? (
          <View className="pt-5 pb-3">
            <Text className="font-poppins-medium text-xs text-dark">
              Top Results
            </Text>
            <View className="mt-3 h-[1px] w-full bg-lightGrey/80" />
          </View>
        ) : null
      }
      renderItem={renderItem}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default WatchSearchResults;

import React, { useState, useCallback } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WatchHeader } from "@/components/ui/WatchHeader";
import { SearchHeader } from "@/components/ui/SearchHeader";
import { SearchResultsHeader } from "@/components/ui/SearchResultsHeader";
import { MovieCard } from "@/components/ui/MovieCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { WatchSearchResults } from "@/components/ui/WatchSearchResults";
import {
  MovieCardSkeleton,
  CategoryCardSkeleton,
} from "@/components/ui/Skeleton";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovies";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import type { Movie } from "@/constants/mockMovies";
import type { GenreCategory } from "@/constants/mockGenres";

export default function WatchScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    movies,
    isLoading: isUpcomingLoading,
    isRefreshing,
    isFetchingMore,
    refresh,
    loadMore,
  } = useUpcomingMovies();

  const {
    results: searchResults,
    categories,
    isSearching: isSearchLoading,
    isCategoriesLoading,
  } = useMovieSearch(searchQuery);

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      router.push(`/movie/${movie.id}`);
    },
    [router]
  );

  const handleCategoryPress = useCallback((_category: GenreCategory) => {
    // Filter by genre
  }, []);

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <View className={isLandscape ? "flex-1" : "w-full"}>
        <MovieCard movie={item} onPress={handleMoviePress} />
      </View>
    ),
    [isLandscape, handleMoviePress]
  );

  const renderCategoryItem = useCallback(
    ({ item }: { item: GenreCategory }) => (
      <CategoryCard category={item} onPress={handleCategoryPress} />
    ),
    [handleCategoryPress]
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setIsSubmitted(false);
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
    setIsSubmitted(false);
  };

  const renderHeader = () => {
    if (!isSearching) {
      return <WatchHeader onSearchPress={() => setIsSearching(true)} />;
    }
    if (isSubmitted) {
      return (
        <SearchResultsHeader
          count={searchResults.length}
          onBackPress={() => setIsSubmitted(false)}
        />
      );
    }
    return (
      <SearchHeader
        value={searchQuery}
        onChangeText={handleSearchChange}
        onClear={handleClearSearch}
      />
    );
  };

  const renderContent = () => {
    if (isSearching && searchQuery.trim() === "") {
      if (isCategoriesLoading && !categories.length) {
        return (
          <View className="flex-row flex-wrap justify-between gap-3 pt-5">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <View key={key} className="h-[100px] w-[48%] mb-3">
                <CategoryCardSkeleton />
              </View>
            ))}
          </View>
        );
      }

      return (
        <FlatList
          key={isLandscape ? "category-grid-land" : "category-grid-port"}
          data={categories}
          numColumns={isLandscape ? 3 : 2}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12, gap: 12 }}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
        />
      );
    }

    if (isSearching && searchQuery.trim() !== "") {
      return (
        <WatchSearchResults
          query={searchQuery}
          isSearchLoading={isSearchLoading}
          searchResults={searchResults}
          isSubmitted={isSubmitted}
          onMoviePress={handleMoviePress}
          onMorePress={() => setIsSubmitted(true)}
        />
      );
    }

    if (isUpcomingLoading && !movies.length) {
      return (
        <View className="pt-5">
          {[1, 2, 3].map((key) => (
            <MovieCardSkeleton key={key} />
          ))}
        </View>
      );
    }

    return (
      <FlatList
        key={isLandscape ? "movie-list-land" : "movie-list-port"}
        data={movies}
        numColumns={isLandscape ? 2 : 1}
        keyExtractor={(item) => item.id}
        refreshing={isRefreshing}
        onRefresh={refresh}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        columnWrapperStyle={isLandscape ? { gap: 16 } : undefined}
        ListFooterComponent={
          isFetchingMore ? (
            <View className="py-3">
              <MovieCardSkeleton />
            </View>
          ) : null
        }
        renderItem={renderMovieItem}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <StatusBar style="dark" />
      {renderHeader()}
      <View className="flex-1 bg-background px-5">{renderContent()}</View>
    </SafeAreaView>
  );
}

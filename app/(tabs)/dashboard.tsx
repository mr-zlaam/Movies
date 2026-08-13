import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useUpcomingMovies } from "@/hooks/useUpcomingMovies";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardScreen() {
  const router = useRouter();
  const { movies, isLoading } = useUpcomingMovies();

  const featuredMovie = movies[0];

  const handleWatchPress = () => {
    router.push("/(tabs)/watch");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View className="flex-row items-center justify-between bg-white px-6 py-4 border-b border-lightGrey/40">
          <View>
            <Text className="font-poppins-semibold text-xl text-dark">
              Dashboard
            </Text>
            <Text className="font-poppins text-xs text-muted">
              Welcome back to Tentwenty Movies
            </Text>
          </View>
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Ionicons name="film-outline" size={22} color="#61C3F2" />
          </View>
        </View>

        {/* Featured Hero Banner */}
        <View className="p-5">
          {isLoading || !featuredMovie ? (
            <Skeleton className="h-[300px] w-full rounded-[20px]" />
          ) : (
            <View className="relative h-[300px] w-full overflow-hidden rounded-[20px] bg-dark shadow-lg">
              <Image
                source={{ uri: featuredMovie.backdropUrl || featuredMovie.posterUrl }}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.85)"]}
                className="absolute inset-0 justify-end p-6"
              >
                <View className="mb-2 self-start rounded-full bg-primary/90 px-3 py-1">
                  <Text className="font-poppins-medium text-[10px] text-white uppercase tracking-wider">
                    Featured
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  className="mb-1 font-poppins-bold text-2xl text-white"
                >
                  {featuredMovie.title}
                </Text>
                <Text
                  numberOfLines={2}
                  className="mb-4 font-poppins text-xs text-white/80 leading-5"
                >
                  {featuredMovie.overview}
                </Text>

                {/* BIG WATCH BUTTON */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Watch Movies"
                  onPress={handleWatchPress}
                  className="h-[52px] w-full flex-row items-center justify-center rounded-[12px] bg-primary active:opacity-90 shadow-md"
                >
                  <Ionicons name="play-circle" size={24} color="#FFFFFF" />
                  <Text className="ml-2.5 font-poppins-semibold text-base text-white">
                    Watch Movies Now
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          )}
        </View>

        {/* Quick Stats Grid */}
        <View className="px-5 pb-4">
          <Text className="mb-3 font-poppins-semibold text-base text-dark">
            Quick Stats
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-[14px] bg-white p-4 shadow-sm border border-lightGrey/30">
              <Ionicons name="videocam" size={20} color="#61C3F2" />
              <Text className="mt-2 font-poppins-bold text-lg text-dark">
                {movies.length || "20+"}
              </Text>
              <Text className="font-poppins text-xs text-muted">
                Upcoming Titles
              </Text>
            </View>

            <View className="flex-1 rounded-[14px] bg-white p-4 shadow-sm border border-lightGrey/30">
              <Ionicons name="ticket" size={20} color="#15D2BC" />
              <Text className="mt-2 font-poppins-bold text-lg text-dark">
                Live
              </Text>
              <Text className="font-poppins text-xs text-muted">
                Seat Booking
              </Text>
            </View>

            <View className="flex-1 rounded-[14px] bg-white p-4 shadow-sm border border-lightGrey/30">
              <Ionicons name="cloud-done" size={20} color="#E26CA5" />
              <Text className="mt-2 font-poppins-bold text-lg text-dark">
                Offline
              </Text>
              <Text className="font-poppins text-xs text-muted">
                SWR Cached
              </Text>
            </View>
          </View>
        </View>

        {/* Horizontal Movies Preview */}
        <View className="pt-2 pb-10">
          <View className="flex-row items-center justify-between px-5 mb-3">
            <Text className="font-poppins-semibold text-base text-dark">
              Trending Upcoming
            </Text>
            <Pressable onPress={handleWatchPress}>
              <Text className="font-poppins-medium text-xs text-primary">
                View All
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          >
            {movies.slice(1, 8).map((movie) => (
              <Pressable
                key={movie.id}
                onPress={() => router.push(`/movie/${movie.id}`)}
                className="w-[140px] active:opacity-90"
              >
                <View className="relative h-[200px] w-full overflow-hidden rounded-[14px] bg-lightGrey mb-2 shadow-sm">
                  <Image
                    source={{ uri: movie.posterUrl || movie.backdropUrl }}
                    style={StyleSheet.absoluteFillObject}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                  />
                </View>
                <Text
                  numberOfLines={1}
                  className="font-poppins-semibold text-xs text-dark"
                >
                  {movie.title}
                </Text>
                <Text className="font-poppins text-[10px] text-muted">
                  {movie.genres[0] || "Movie"}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

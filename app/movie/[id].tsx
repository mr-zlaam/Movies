import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { GenreTag } from "@/components/ui/GenreTag";
import { Skeleton } from "@/components/ui/Skeleton";
import { TrailerModal } from "@/components/ui/TrailerModal";

export default function MovieDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isTrailerVisible, setIsTrailerVisible] = React.useState(false);

  const { movie, trailerKey, isLoading } = useMovieDetails(id ?? "");

  if (isLoading || !movie) {
    return (
      <View className="flex-1 bg-white">
        <Skeleton className="h-[466px] w-full" />
        <View className="p-8">
          <Skeleton className="h-6 w-1/3 rounded-md mb-4" />
          <Skeleton className="h-8 w-full rounded-full mb-6" />
          <Skeleton className="h-[1px] w-full mb-6" />
          <Skeleton className="h-6 w-1/3 rounded-md mb-4" />
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </View>
      </View>
    );
  }

  const formattedDate =
    movie.releaseDate && movie.releaseDate !== "Coming Soon"
      ? new Date(movie.releaseDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "December 22, 2021";

  const imageSource = movie.posterUrl || movie.backdropUrl;

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      {/* Hero Banner Section (Figma 3: 375 x 466) */}
      <View className="relative h-[466px] w-full bg-dark">
        <Image
          source={{ uri: imageSource }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={300}
          cachePolicy="disk"
        />
        <LinearGradient
          pointerEvents="box-none"
          colors={["rgba(0,0,0,0.5)", "transparent", "rgba(0,0,0,0.92)"]}
          locations={[0, 0.35, 1]}
          className="absolute inset-0 justify-between px-8 pb-7"
        >
          {/* Top Header Overlay */}
          <SafeAreaView edges={["top"]} className="pt-2" pointerEvents="box-none">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              className="flex-row items-center self-start p-1"
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              <Text className="ml-2 font-poppins-medium text-base text-white">
                Watch
              </Text>
            </Pressable>
          </SafeAreaView>

          {/* Bottom Hero Actions */}
          <View className="w-full items-center" pointerEvents="box-none">
            <Text
              numberOfLines={2}
              className="mb-1 font-poppins-semibold text-2xl text-white text-center"
            >
              {movie.title}
            </Text>

            <Text className="mb-4 font-poppins-medium text-sm text-white text-center">
              In Theaters {formattedDate}
            </Text>

            {/* Get Tickets Button: Figma width 243, height 50 */}
            <Pressable
              pointerEvents="auto"
              accessibilityRole="button"
              accessibilityLabel="Get tickets"
              onPress={() => {
                router.push({
                  pathname: "/booking/[id]",
                  params: { id: movie.id },
                });
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              className="h-[50px] w-[243px] items-center justify-center rounded-[10px] bg-primary z-20 shadow-md"
            >
              <Text className="font-poppins-semibold text-sm text-white">
                Get Tickets
              </Text>
            </Pressable>

            {/* Watch Trailer Button: Figma width 243, height 50 */}
            <Pressable
              pointerEvents="auto"
              accessibilityRole="button"
              accessibilityLabel="Watch trailer"
              onPress={() => setIsTrailerVisible(true)}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              className="mt-3 h-[50px] w-[243px] flex-row items-center justify-center rounded-[10px] border-2 border-primary bg-black/30"
            >
              <Ionicons name="play" size={14} color="#FFFFFF" />
              <Text className="ml-2 font-poppins-semibold text-sm text-white">
                Watch Trailer
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {/* Details & Overview Body */}
      <View className="px-8 pt-6 pb-12">
        <Text className="mb-3 font-poppins-semibold text-base text-dark">
          Genres
        </Text>
        <View className="mb-6 flex-row flex-wrap gap-2.5">
          {movie.genres.map((genre, index) => (
            <GenreTag key={genre} name={genre} index={index} />
          ))}
        </View>

        <View className="mb-6 h-[1px] w-full bg-lightGrey/80" />

        <Text className="mb-3 font-poppins-semibold text-base text-dark">
          Overview
        </Text>
        <Text className="font-poppins text-xs leading-6 text-muted">
          {movie.overview}
        </Text>
      </View>

      {/* Trailer Modal Player */}
      <TrailerModal
        visible={isTrailerVisible}
        trailerKey={trailerKey}
        movieTitle={movie.title}
        onClose={() => setIsTrailerVisible(false)}
      />
    </ScrollView>
  );
}

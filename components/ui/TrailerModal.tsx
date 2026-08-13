import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import type { TrailerModalProps } from "./TrailerModal/types";

export function TrailerModal({
  visible,
  trailerKey,
  movieTitle = "Movie Trailer",
  onClose,
}: TrailerModalProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (visible) {
      setPlaying(true);
      setIsReady(false);
    } else {
      setPlaying(false);
    }
  }, [visible]);

  const playerWidth = width;
  const playerHeight = isLandscape ? height : Math.round((width * 9) / 16);

  const onStateChange = useCallback(
    (state: string) => {
      if (state === "ended") {
        setPlaying(false);
        onClose();
      }
    },
    [onClose]
  );

  const handleReady = useCallback(() => {
    setIsReady(true);
    setPlaying(true);
  }, []);

  if (!visible || !trailerKey) return null;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar style="light" hidden={isLandscape} />
      <View className="flex-1 bg-black justify-between">
        {/* Top Header Overlay */}
        {!isLandscape && (
          <SafeAreaView className="z-10 bg-black/80 px-4 py-3 flex-row items-center justify-between">
            <Text
              numberOfLines={1}
              className="flex-1 font-poppins-semibold text-base text-white mr-4"
            >
              {movieTitle}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Done watching trailer"
              onPress={onClose}
              className="rounded-full bg-primary px-5 py-2 active:opacity-80"
            >
              <Text className="font-poppins-semibold text-sm text-white">
                Done
              </Text>
            </Pressable>
          </SafeAreaView>
        )}

        {/* Video Player Container */}
        <View className="flex-1 justify-center items-center relative bg-black">
          {!isReady && (
            <View className="absolute z-20 items-center justify-center">
              <ActivityIndicator size="large" color="#61C3F2" />
              <Text className="mt-3 font-poppins text-xs text-white/70">
                Loading Trailer...
              </Text>
            </View>
          )}

          <YoutubePlayer
            height={playerHeight}
            width={playerWidth}
            play={playing}
            videoId={trailerKey}
            onChangeState={onStateChange}
            onReady={handleReady}
            initialPlayerVars={{
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              playsinline: 0,
            }}
          />
        </View>

        {/* Bottom Hint Footer */}
        {!isLandscape && (
          <SafeAreaView className="bg-black/80 px-4 py-3 items-center">
            <View className="flex-row items-center">
              <Ionicons name="information-circle-outline" size={16} color="#827D88" />
              <Text className="ml-1.5 font-poppins text-xs text-muted">
                Auto-closes when video ends or tap Done
              </Text>
            </View>
          </SafeAreaView>
        )}
      </View>
    </Modal>
  );
}

export default TrailerModal;

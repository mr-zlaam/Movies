import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { DateSelector } from "@/components/booking/DateSelector";
import { HallCard } from "@/components/booking/HallCard";
import { SeatGrid, type SeatItem } from "@/components/booking/SeatGrid";
import { SeatLegend } from "@/components/booking/SeatLegend";
import { SeatChips } from "@/components/booking/SeatChips";
import { BookingSuccessModal } from "@/components/booking/BookingSuccessModal";
import { generateMockSeats } from "@/lib/constants/mockSeats";

const DATES = ["5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar"];

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movie } = useMovieDetails(id ?? "");

  const [selectedDate] = useState("5 Mar");
  const [selectedHall, setSelectedHall] = useState("12:30");
  const [step, setStep] = useState<"hall" | "seats">("hall");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [seats] = useState<SeatItem[]>(generateMockSeats);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(["C-3-4"]);

  const handleToggleSeat = (seat: SeatItem) => {
    setSelectedSeatIds((prev) =>
      prev.includes(seat.id)
        ? prev.filter((seatId) => seatId !== seat.id)
        : [...prev, seat.id]
    );
  };

  const handleRemoveSeat = (seatId: string) => {
    setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
  };

  const selectedSeatsList = seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeatsList.reduce((sum, s) => sum + s.price, 0);

  const handleCheckout = () => {
    if (selectedSeatIds.length === 0) {
      Alert.alert("Select Seats", "Please select at least 1 seat to continue.");
      return;
    }
    setIsSuccessModalVisible(true);
  };

  const handleModalClose = () => {
    setIsSuccessModalVisible(false);
    router.push("/(tabs)/watch");
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <StatusBar style="dark" />
      {/* Header Bar */}
      <View className="flex-row items-center justify-between border-b border-lightGrey/40 px-6 py-4 bg-white">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => (step === "seats" ? setStep("hall") : router.back())}
          className="p-1"
        >
          <Ionicons name="chevron-back" size={24} color="#2E2739" />
        </Pressable>

        <View className="items-center">
          <Text
            numberOfLines={1}
            className="font-poppins-semibold text-base text-dark"
          >
            {movie?.title ?? "The King's Man"}
          </Text>
          <Text className="font-poppins-medium text-xs text-primary">
            {step === "seats"
              ? `March 5, 2021  |  ${selectedHall} Hall 1`
              : `In Theaters March 5, 2021`}
          </Text>
        </View>

        <View className="w-6" />
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-background">
        {step === "hall" ? (
          <ScrollView
            className="flex-1 pt-6"
            showsVerticalScrollIndicator={false}
          >
            <DateSelector
              dates={DATES}
              selectedDate={selectedDate}
              onSelectDate={() => {}}
            />

            <View className="mb-6">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
              >
                <HallCard
                  time="12:30"
                  hallName="Cinetech + Hall 1"
                  price={50}
                  bonus={2500}
                  isSelected={selectedHall === "12:30"}
                  onSelect={() => setSelectedHall("12:30")}
                />
                <HallCard
                  time="13:30"
                  hallName="Cinetech + Hall 2"
                  price={75}
                  bonus={3000}
                  isSelected={selectedHall === "13:30"}
                  onSelect={() => setSelectedHall("13:30")}
                />
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 justify-between">
            <SeatGrid
              seats={seats}
              selectedSeatIds={selectedSeatIds}
              onToggleSeat={handleToggleSeat}
            />
            <View>
              <SeatLegend />
              <SeatChips
                selectedSeats={selectedSeatsList}
                onRemoveSeat={handleRemoveSeat}
              />
            </View>
          </View>
        )}
      </View>

      {/* Bottom Floating CTA Payment Bar */}
      <View className="border-t border-lightGrey/40 bg-white p-6">
        {step === "hall" ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Select seats"
            onPress={() => setStep("seats")}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
            className="h-[50px] w-full items-center justify-center rounded-[10px] bg-primary shadow-md"
          >
            <Text className="font-poppins-semibold text-base text-white">
              Select Seats
            </Text>
          </Pressable>
        ) : (
          <View className="flex-row items-center justify-between gap-3">
            <View className="rounded-[10px] bg-background px-5 py-2.5 min-w-[110px]">
              <Text className="font-poppins text-[10px] text-muted">
                Total Price
              </Text>
              <Text className="font-poppins-bold text-lg text-dark">
                $ {totalPrice}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Proceed to pay"
              onPress={handleCheckout}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
              className="h-[50px] flex-1 items-center justify-center rounded-[10px] bg-primary shadow-md"
            >
              <Text className="font-poppins-semibold text-base text-white">
                Proceed to pay
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Custom Booking Success Dialog */}
      <BookingSuccessModal
        visible={isSuccessModalVisible}
        movieTitle={movie?.title ?? "Movie"}
        date={selectedDate}
        hallTime={selectedHall}
        seatCount={selectedSeatIds.length}
        totalPrice={totalPrice}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  );
}

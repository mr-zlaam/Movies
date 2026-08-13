import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BookingSuccessModalProps {
  visible: boolean;
  movieTitle: string;
  date: string;
  hallTime: string;
  seatCount: number;
  totalPrice: number;
  onClose: () => void;
}

export function BookingSuccessModal({
  visible,
  movieTitle,
  date,
  hallTime,
  seatCount,
  totalPrice,
  onClose,
}: BookingSuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <View className="w-full max-w-[340px] items-center rounded-[24px] bg-white p-6 shadow-2xl">
          {/* Top Success Icon Badge */}
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary/15">
            <Ionicons name="ticket" size={32} color="#61C3F2" />
          </View>

          {/* Heading */}
          <Text className="mb-1 font-poppins-bold text-xl text-dark">
            Booking Confirmed!
          </Text>
          <Text className="mb-6 font-poppins text-xs text-muted text-center">
            Your movie tickets have been reserved successfully.
          </Text>

          {/* Details Ticket Summary Card */}
          <View className="mb-6 w-full rounded-[16px] bg-lightGrey/40 p-4">
            <View className="mb-2 flex-row justify-between">
              <Text className="font-poppins text-xs text-muted">Movie</Text>
              <Text className="font-poppins-semibold text-xs text-dark" numberOfLines={1}>
                {movieTitle}
              </Text>
            </View>

            <View className="mb-2 flex-row justify-between">
              <Text className="font-poppins text-xs text-muted">Date & Time</Text>
              <Text className="font-poppins-semibold text-xs text-dark">
                {date} at {hallTime}
              </Text>
            </View>

            <View className="mb-2 flex-row justify-between">
              <Text className="font-poppins text-xs text-muted">Seats</Text>
              <Text className="font-poppins-semibold text-xs text-dark">
                {seatCount} seat(s)
              </Text>
            </View>

            <View className="mt-1 h-[1px] w-full bg-lightGrey/80" />

            <View className="mt-3 flex-row justify-between items-center">
              <Text className="font-poppins-semibold text-xs text-dark">
                Total Amount
              </Text>
              <Text className="font-poppins-bold text-base text-primary">
                ${totalPrice}
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onClose}
            className="h-[50px] w-full items-center justify-center rounded-[12px] bg-primary shadow-md"
          >
            <Text className="font-poppins-semibold text-sm text-white">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default BookingSuccessModal;

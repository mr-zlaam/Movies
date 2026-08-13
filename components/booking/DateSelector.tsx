import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import type { DateSelectorProps } from "./types";

export function DateSelector({
  dates,
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  return (
    <View className="mb-6">
      <Text className="mb-3 px-6 font-poppins-bold text-base text-dark">
        Date
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
      >
        {dates.map((date) => {
          const isSelected = date === selectedDate;
          return (
            <TouchableOpacity
              key={date}
              activeOpacity={1}
              onPress={() => {
                if (onSelectDate) {
                  onSelectDate(date);
                }
              }}
              className={`h-[36px] px-5 items-center justify-center rounded-[10px] ${
                isSelected ? "bg-primary shadow-sm" : "bg-lightGrey/40"
              }`}
            >
              <Text
                className={`font-poppins-semibold text-xs ${
                  isSelected ? "text-white" : "text-dark"
                }`}
              >
                {date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default DateSelector;

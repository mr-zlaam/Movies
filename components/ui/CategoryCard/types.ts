import type { GenreCategory } from "@/constants/mockGenres";

export interface CategoryCardProps {
  category: GenreCategory;
  onPress?: (category: GenreCategory) => void;
}

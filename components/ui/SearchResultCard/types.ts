import type { Movie } from "@/constants/mockMovies";

export interface SearchResultCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  onMorePress?: (movie: Movie) => void;
}

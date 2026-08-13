import type { Movie } from "@/constants/mockMovies";

export interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
}

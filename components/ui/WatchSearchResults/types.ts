import type { Movie } from "@/constants/mockMovies";

export interface WatchSearchResultsProps {
  query: string;
  isSearchLoading: boolean;
  searchResults: Movie[];
  isSubmitted: boolean;
  onMoviePress: (movie: Movie) => void;
  onMorePress: () => void;
}

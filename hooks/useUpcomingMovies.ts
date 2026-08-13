import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchUpcomingMovies,
  fetchGenreList,
  getTMDBImageUrl,
  type TMDBGenre,
} from "@/lib/services/tmdb";
import { getCacheData, setCacheData } from "@/lib/services/cache";
import type { Movie } from "@/constants/mockMovies";

const CACHE_KEY_MOVIES = "TMDB_UPCOMING_MOVIES_PAGINATED_V2";

export function useUpcomingMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const currentPageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const genreMapRef = useRef<Map<number, string>>(new Map());

  const mapTMDBMovie = (item: {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    overview: string;
    genre_ids: number[];
  }): Movie => ({
    id: String(item.id),
    title: item.title,
    posterUrl: getTMDBImageUrl(item.poster_path, "w780"),
    backdropUrl: getTMDBImageUrl(item.backdrop_path || item.poster_path, "w1280"),
    releaseDate: item.release_date || "Coming Soon",
    overview: item.overview || "No overview available.",
    genres:
      item.genre_ids?.map((id) => genreMapRef.current.get(id) || "Movie").slice(0, 3) ||
      ["Upcoming"],
  });

  const loadMovies = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);

    try {
      currentPageRef.current = 1;

      // 1. Try cache first for instant render
      const cached = await getCacheData<{ movies: Movie[]; totalPages: number }>(
        CACHE_KEY_MOVIES
      );
      if (cached && cached.movies.length > 0 && !showRefreshing) {
        setMovies(cached.movies);
        totalPagesRef.current = cached.totalPages;
        setIsLoading(false);
      }

      // 2. Fetch fresh page 1 data from TMDB API
      const [genreRes, movieRes] = await Promise.all([
        fetchGenreList().catch(() => ({ genres: [] as TMDBGenre[] })),
        fetchUpcomingMovies(1),
      ]);

      genreMapRef.current = new Map<number, string>(
        genreRes.genres.map((g) => [g.id, g.name])
      );

      totalPagesRef.current = movieRes.total_pages;
      setHasMore(1 < movieRes.total_pages);

      const mapped = movieRes.results.map(mapTMDBMovie);
      setMovies(mapped);

      await setCacheData(CACHE_KEY_MOVIES, {
        movies: mapped,
        totalPages: movieRes.total_pages,
      });
    } catch (_err) {
      // Retain cache on network error
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (
      isFetchingMore ||
      isLoading ||
      isRefreshing ||
      currentPageRef.current >= totalPagesRef.current
    ) {
      return;
    }

    setIsFetchingMore(true);
    const nextPage = currentPageRef.current + 1;

    try {
      const movieRes = await fetchUpcomingMovies(nextPage);
      currentPageRef.current = nextPage;
      totalPagesRef.current = movieRes.total_pages;
      setHasMore(nextPage < movieRes.total_pages);

      const newMovies = movieRes.results.map(mapTMDBMovie);

      setMovies((prev) => {
        // Prevent duplicate entries
        const existingIds = new Set(prev.map((m) => m.id));
        const filteredNew = newMovies.filter((m) => !existingIds.has(m.id));
        const updated = [...prev, ...filteredNew];
        setCacheData(CACHE_KEY_MOVIES, {
          movies: updated,
          totalPages: movieRes.total_pages,
        });
        return updated;
      });
    } catch (_err) {
      // Ignore loadMore error
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, isLoading, isRefreshing]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return {
    movies,
    isLoading,
    isRefreshing,
    isFetchingMore,
    hasMore,
    refresh: () => loadMovies(true),
    loadMore,
  };
}

export default useUpcomingMovies;

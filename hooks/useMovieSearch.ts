import { useState, useEffect } from "react";
import {
  searchMovies,
  getTMDBImageUrl,
  fetchGenreList,
  fetchUpcomingMovies,
} from "@/lib/services/tmdb";
import { getCacheData, setCacheData } from "@/lib/services/cache";
import type { Movie } from "@/constants/mockMovies";
import type { GenreCategory } from "@/constants/mockGenres";

const CACHE_KEY_GENRES_CATEGORIES = "TMDB_GENRE_CATEGORIES_V1";

export function useMovieSearch(query: string) {
  const [results, setResults] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<GenreCategory[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  // Load dynamic genre categories from TMDB API
  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      // 1. Try cache
      const cached = await getCacheData<GenreCategory[]>(
        CACHE_KEY_GENRES_CATEGORIES
      );
      if (cached && cached.length > 0 && isMounted) {
        setCategories(cached);
        setIsCategoriesLoading(false);
      }

      try {
        const [genreRes, upcomingRes] = await Promise.all([
          fetchGenreList(),
          fetchUpcomingMovies(1).catch(() => ({ results: [] })),
        ]);

        const backdropPool = upcomingRes.results.map((m) =>
          getTMDBImageUrl(m.backdrop_path || m.poster_path, "w780")
        );

        const mappedCategories: GenreCategory[] = genreRes.genres.map(
          (g, idx) => ({
            id: String(g.id),
            name: g.name,
            imageUrl:
              backdropPool[idx % backdropPool.length] ||
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop",
          })
        );

        if (isMounted) {
          setCategories(mappedCategories);
          setIsCategoriesLoading(false);
        }

        await setCacheData(CACHE_KEY_GENRES_CATEGORIES, mappedCategories);
      } catch (_err) {
        // Fallback to cache
      } finally {
        if (isMounted) setIsCategoriesLoading(false);
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let isMounted = true;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const [genreRes, searchRes] = await Promise.all([
          fetchGenreList().catch(() => ({ genres: [] })),
          searchMovies(query),
        ]);

        const genreMap = new Map(genreRes.genres.map((g) => [g.id, g.name]));

        const mapped: Movie[] = searchRes.results.map((item) => ({
          id: String(item.id),
          title: item.title,
          posterUrl: getTMDBImageUrl(item.poster_path, "w780"),
          backdropUrl: getTMDBImageUrl(item.backdrop_path, "w1280"),
          releaseDate: item.release_date || "N/A",
          overview: item.overview || "",
          genres:
            item.genre_ids?.map((id) => genreMap.get(id) || "Movie") || [
              "Movie",
            ],
        }));

        if (isMounted) {
          setResults(mapped);
        }
      } catch (_err) {
        if (isMounted) setResults([]);
      } finally {
        if (isMounted) setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [query]);

  return { results, categories, isSearching, isCategoriesLoading };
}

export default useMovieSearch;

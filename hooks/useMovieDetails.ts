import { useState, useEffect } from "react";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  getTMDBImageUrl,
  type TMDBVideo,
} from "@/lib/services/tmdb";
import { getCacheData, setCacheData } from "@/lib/services/cache";
import type { Movie } from "@/constants/mockMovies";

export function useMovieDetails(movieId: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `TMDB_MOVIE_DETAIL_${movieId}`;

    async function loadDetails() {
      setIsLoading(true);

      // 1. Try cache
      const cached = await getCacheData<{ movie: Movie; trailerKey: string | null }>(cacheKey);
      if (cached && isMounted) {
        setMovie(cached.movie);
        setTrailerKey(cached.trailerKey);
        setIsLoading(false);
      }

      // 2. Fetch API
      try {
        const [detailRes, videoRes] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieVideos(movieId).catch(() => ({ results: [] as TMDBVideo[] })),
        ]);

        const mappedMovie: Movie = {
          id: String(detailRes.id),
          title: detailRes.title,
          posterUrl: getTMDBImageUrl(detailRes.poster_path, "w780"),
          backdropUrl: getTMDBImageUrl(detailRes.backdrop_path, "w1280"),
          releaseDate: detailRes.release_date || "Coming Soon",
          overview: detailRes.overview || "No overview available.",
          genres: detailRes.genres.map((g) => g.name),
        };

        const trailer =
          videoRes.results.find(
            (v) => v.site === "YouTube" && v.type === "Trailer"
          ) ?? videoRes.results.find((v) => v.site === "YouTube");

        const foundKey = trailer ? trailer.key : null;

        if (isMounted) {
          setMovie(mappedMovie);
          setTrailerKey(foundKey);
        }

        await setCacheData(cacheKey, { movie: mappedMovie, trailerKey: foundKey });
      } catch (_err) {
        // Fallback to cached state
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (movieId) {
      loadDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  return { movie, trailerKey, isLoading };
}

export default useMovieDetails;

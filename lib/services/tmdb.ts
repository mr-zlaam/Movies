export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovieDetail extends Omit<TMDBMovie, "genre_ids"> {
  genres: TMDBGenre[];
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY ?? "3290f1650ceb172ea0a3cc48d845729f";
const READ_TOKEN = process.env.EXPO_PUBLIC_TMDB_READ_TOKEN ?? "";

export function getTMDBImageUrl(
  path: string | null,
  size: "w500" | "w780" | "w1280" | "original" = "w780"
): string {
  if (!path) {
    return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop";
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
}

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (READ_TOKEN) {
    headers.Authorization = `Bearer ${READ_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUpcomingMovies(page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>("/movie/upcoming", { page: String(page) });
}

export async function searchMovies(query: string, page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>("/search/movie", { query, page: String(page) });
}

export async function fetchMovieDetails(movieId: number | string): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(`/movie/${movieId}`);
}

export async function fetchMovieVideos(movieId: number | string): Promise<{ results: TMDBVideo[] }> {
  return tmdbFetch<{ results: TMDBVideo[] }>(`/movie/${movieId}/videos`);
}

export async function fetchGenreList(): Promise<{ genres: TMDBGenre[] }> {
  return tmdbFetch<{ genres: TMDBGenre[] }>("/genre/movie/list");
}

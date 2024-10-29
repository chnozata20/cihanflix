import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MOVIEDB_API_BASE_URL;
const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Fetch popular movies
export const fetchPopularMovies = async () => {
  const response = await apiClient.get('/movie/popular');
  return response.data.results;
};

// Fetch top-rated movies
export const fetchTopRatedMovies = async () => {
  const response = await apiClient.get('/movie/top_rated');
  return response.data.results;
};

// Fetch popular TV shows
export const fetchPopularTVShows = async () => {
  const response = await apiClient.get('/tv/popular');
  return response.data.results;
};

// Fetch top-rated TV shows
export const fetchTopRatedTVShows = async () => {
  const response = await apiClient.get('/tv/top_rated');
  return response.data.results;
};

// Fetch movie details with videos
export const fetchMovieDetails = async (movieId) => {
  const response = await apiClient.get(`/movie/${movieId}`, {
    params: { append_to_response: 'videos' }
  });
  return response.data;
};

// Fetch TV show details with videos
export const fetchTVShowDetails = async (tvShowId) => {
  const response = await apiClient.get(`/tv/${tvShowId}`, {
    params: { append_to_response: 'videos' }
  });
  return response.data;
};

// Search movies and shows
export const searchMoviesAndShows = async (query) => {
  const response = await apiClient.get('/search/multi', {
    params: { query },
  });
  return response.data.results;
};

// Search movies
export const fetchSearchResults = async (query) => {
  const response = await apiClient.get('/search/movie', { params: { query } });
  return response.data.results;
};

// Fetch movie credits
export const fetchMovieCredits = async (movieId) => {
  const response = await apiClient.get(`/movie/${movieId}/credits`);
  return response.data;
};

// Fetch TV show credits
export const fetchTVCredits = async (tvShowId) => {
  const response = await apiClient.get(`/tv/${tvShowId}/credits`);
  return response.data;
};

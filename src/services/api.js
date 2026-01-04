import axios from 'axios';

const API_KEY = '2dca580c2a14b55200e784d157207b4d'; // TMDB API key (public)
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get('/movie/popular', { params: { page } });
  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await api.get('/movie/top_rated', { params: { page } });
  return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await api.get('/movie/upcoming', { params: { page } });
  return response.data;
};

export const getNowPlayingMovies = async (page = 1) => {
  const response = await api.get('/movie/now_playing', { params: { page } });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getMovieVideos = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default api;






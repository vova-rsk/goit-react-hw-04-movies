import axios from 'axios';

const API_KEY = 'd81df9c293a8c58366ed983adfddab04';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'day';

const fetchGetTrending = async () => {
  const url = `${BASE_URL}/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response;
};

const fetchSearchMovies = () => {};

const fetchMoviesDetails = async id => {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${id}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response;
};

const fetchMoviesCredits = async id => {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response;
};

const fetchMoviesReviews = async id => {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  const response = await axios.get(url);
  return response;
};

const profilePathMaker = data => {
  if (!data.length) return data;
  return data.map(actor => {
    const { profile_path: path } = actor;
    const updatedPath = path ? `${BASE_IMG_URL}${path}` : path;
    return { ...actor, profile_path: updatedPath };
  });
};

const api = {
  fetchGetTrending,
  fetchSearchMovies,
  fetchMoviesDetails,
  fetchMoviesCredits,
  fetchMoviesReviews,
  profilePathMaker,
};

export default api;

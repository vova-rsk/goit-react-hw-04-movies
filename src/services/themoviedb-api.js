import axios from 'axios';

const API_KEY = 'd81df9c293a8c58366ed983adfddab04';
const BASE_URL = 'https://api.themoviedb.org/3';
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

const fetchMoviesCredits = () => {};

const fetchMoviesReviews = () => {};

const api = {
  fetchGetTrending,
  fetchSearchMovies,
  fetchMoviesDetails,
  fetchMoviesCredits,
  fetchMoviesReviews,
};

export default api;

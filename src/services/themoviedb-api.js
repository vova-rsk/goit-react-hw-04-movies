import axios from 'axios';

const API_KEY = 'd81df9c293a8c58366ed983adfddab04';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'day';
const FETCH_TYPE = {
  TRENDS: 'trends',
  SEARCH: 'search',
  MOVIE: 'movie',
  CREDITS: 'credits',
};

axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
  include_adult: false,
};

/*func for fetching trending movies*/
const fetchTrends = async () => {
  const url = `${BASE_URL}/trending/${MEDIA_TYPE}/${TIME_WINDOW}`;
  const data = await axios.get(url);
  return imagePathCorrection(data, FETCH_TYPE.TRENDS);
};

/*func for fetching movies by search*/
const fetchMovies = async (query, page = 1) => {
  const url = `${BASE_URL}/search/${MEDIA_TYPE}`;
  const data = await axios.get(url, { params: { query, page } });
  return imagePathCorrection(data, FETCH_TYPE.SEARCH);
};

/*func for fetching movie detailed info*/
const fetchMovie = async id => {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${id}`;
  const data = await axios.get(url);
  return imagePathCorrection(data, FETCH_TYPE.MOVIE);
};

/*func for fetching credits for current movie*/
const fetchCredits = async id => {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${id}/credits`;
  const data = await axios.get(url);
  return imagePathCorrection(data, FETCH_TYPE.CREDITS);
};

/*func for fetching reviews for current movie*/
const fetchReviews = async (id, page = 1) => {
  const url = `${BASE_URL}/${MEDIA_TYPE}/${id}/reviews`;
  const data = await axios.get(url, { params: { page } });
  return data;
};

/*func for correcting img path for posters or profiles-logo*/
const imagePathCorrection = (fetchData, type) => {
  const updatedData = { ...fetchData };

  if (type !== FETCH_TYPE.MOVIE) {
    const attributeName = fetchData.data.hasOwnProperty('results')
      ? 'results'
      : 'cast';
    const key = attributeName !== 'results' ? 'profile_path' : 'poster_path';
    const array = updatedData.data[attributeName].map(item => ({
      ...item,
      [key]: item[key] ? BASE_IMG_URL + item[key] : item[key],
    }));

    updatedData.data[attributeName] = array;
    return updatedData;
  } else {
    const key = 'poster_path';

    if (updatedData.data[key]) {
      updatedData.data[key] = BASE_IMG_URL + updatedData.data[key];
    }

    return updatedData;
  }
};

const api = {
  fetchTrends,
  fetchMovies,
  fetchMovie,
  fetchCredits,
  fetchReviews,
};

export default api;

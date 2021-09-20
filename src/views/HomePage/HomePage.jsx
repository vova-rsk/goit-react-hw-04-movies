import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/MoviesList';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();

  /*fetching trending movies*/
  useEffect(() => {
    themoviedbApi
      .fetchGetTrending()
      .then(responseData => {
        const data = responseData.data.results;
        if (data) setTrendingMovies(data);
      })
      .catch(error => console.log(error.message));
  }, []);

  return (
    trendingMovies && (
      <MoviesList url={`/movies`} movies={trendingMovies} hash={location} />
    )
  );
};

export default HomePage;

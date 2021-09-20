import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/Movies/MoviesList';
import css from './HomePage.module.css';

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
      <>
        <h2 className={css.title}>Thrending today</h2>
        <MoviesList url={`/movies`} movies={trendingMovies} hash={location} />
      </>
    )
  );
};

export default HomePage;

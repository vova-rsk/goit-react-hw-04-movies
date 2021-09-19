import { useEffect, useState } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/MoviesList';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    themoviedbApi
      .fetchGetTrending()
      .then(responseData => setTrendingMovies(responseData.data.results))
      .catch(error => console.log(error.message));
  }, []);

  const currentLocation = location;

  return (
    trendingMovies && (
      <MoviesList
        url={`${url}movies`}
        movies={trendingMovies}
        hash={currentLocation}
      />
    )
  );
};

export default HomePage;

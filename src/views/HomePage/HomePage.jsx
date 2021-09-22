import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/Movies/MoviesList';
import css from './HomePage.module.css';
import Loader from '../../components/Loader';
import { STATUS } from '../../common/variables';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const location = useLocation();
  const [status, setStatus] = useState(STATUS.IDLE);

  /*fetching trending movies*/
  useEffect(() => {
    setStatus(STATUS.PENDING);
    themoviedbApi
      .fetchTrends()
      .then(responseData => {
        const data = responseData.data.results;
        if (data) setTrendingMovies(data);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.log(error.message);
        setStatus(STATUS.REJECTED);
      });
  }, []);

  if (status === STATUS.PENDING) return <Loader />;
  if (status === STATUS.REJECTED) return <div>Error</div>;

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

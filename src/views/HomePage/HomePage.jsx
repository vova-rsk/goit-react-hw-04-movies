import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from './HomePage.module.css';
import themoviedbApi from '../../services/themoviedb-api';

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    themoviedbApi
      .fetchGetTrending()
      .then(responseData => setTrendingMovies(responseData.data.results))
      .catch(error => console.log(error.message));
  }, []);

  return (
    trendingMovies && (
      <div className={css.container}>
        <ul>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default HomePage;

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MoviesList.module.css';

const MoviesList = ({ url, hash, movies }) => {
  return (
    <div className={css.container}>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <Link
              to={{ pathname: `${url}/${movie.id}`, state: { from: hash } }}
              className={css.link}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;

MoviesList.propTypes = {
  url: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  hash: PropTypes.object.isRequired,
};

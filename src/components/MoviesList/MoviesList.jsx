import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MoviesList.module.css';

const MoviesList = ({ url, hash, movies }) => {
  return (
    <div className={css.container}>
      <ul>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            {/* <NavLink to={`${url}/${movie.id}`} className={css.link}>{movie.title}</NavLink> */}
            <NavLink
              to={{ pathname: `${url}/${movie.id}`, state: { from: hash } }}
              className={css.link}
            >
              {movie.title}
            </NavLink>
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
};

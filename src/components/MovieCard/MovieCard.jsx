import React from 'react';
import PropTypes from 'prop-types';
import css from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const { title, poster, date, votes, overview, genres } = movie;
  return (
    <div className={css.movie}>
      <div className={css.imgThumb}>
        <img className={css.image} src={poster} alt={title} width="500" />
      </div>
      <div className={css.infoThumb}>
        <h2 className={css.title}>{`${title} (${date})`}</h2>
        <p className={css.info}>{`User Score: ${votes}`}</p>
        <h3 className={css.subtitle}>Overview</h3>
        <p className={css.info}>{overview}</p>
        <h3 className={css.subtitle}>Genres</h3>
        <p className={css.info}>{genres}</p>
      </div>
    </div>
  );
};

export default MovieCard;

MovieCard.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  date: PropTypes.string,
  votes: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.string,
};

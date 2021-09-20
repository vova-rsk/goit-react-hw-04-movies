import React from 'react';
import PropTypes from 'prop-types';
import css from './MovieCard.module.css';
import defaultPoster from './default-poster.jpg';

/*
 *  function of obtaining the required values in the required
 *  format from the movie object
 */
const getValues = movieObj => {
  const {
    title,
    release_date: releaseDate,
    overview,
    genres: genresObj,
    poster_path: poster,
    vote_average: votesAverage,
  } = movieObj;

  const votes = `${Math.round(votesAverage * 10)}%`;
  const date = releaseDate ? new Date(releaseDate).getFullYear() : '---';
  const genres = genresObj
    ? genresObj.reduce((acc, item) => [...acc, item.name], []).join(' ')
    : '';

  return { title, overview, date, votes, genres, poster };
};

/*Component*/
const MovieCard = ({ movie }) => {
  const { title, poster, date, votes, overview, genres } = getValues(movie);
  return (
    <div className={css.movie}>
      <div className={css.imgThumb}>
        <img
          className={css.image}
          src={poster ?? defaultPoster}
          alt={title}
          width="500"
        />
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

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieDetailsPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';

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
    poster_path: posterPath,
    vote_average: votesAverage,
  } = movieObj;

  const votes = `${Math.round(votesAverage * 10)}%`;
  const date = releaseDate ? new Date(releaseDate).getFullYear() : '---';
  const genres = genresObj
    ? genresObj.reduce((acc, item) => [...acc, item.name], []).join(' ')
    : '';
  const poster = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '';

  return { title, overview, date, votes, genres, poster };
};

/*Component*/
const MovieDetailsPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    themoviedbApi
      .fetchMoviesDetails(params.movieId)
      .then(response => setMovie(response.data))
      .catch(error => console.log(error.message));
  }, [params.movieId]);

  const { title, overview, date, votes, genres, poster } = getValues(movie);

  return (
    movie && (
      <div className={css.container}>
        <button className={css.button} type="button">
          Go back
        </button>
        <div className={css.movie}>
          <div className={css.imgThumb}>
            <img className={css.image} src={poster} alt={title} width="500" />
          </div>
          <div className={css.infoThumb}>
            <h2 className={css.title}>{`${title} (${date})`}</h2>
            <p className={css.info}>{votes}</p>
            <h3 className={css.subtitle}>Overview</h3>
            <p className={css.info}>{overview}</p>
            <h3 className={css.subtitle}>Genres</h3>
            <p className={css.info}>{genres}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetailsPage;

MovieDetailsPage.propTypes = {};

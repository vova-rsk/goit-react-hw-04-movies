import { useState, useEffect } from 'react';
import {
  useRouteMatch,
  useParams,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import Cast from '../Cast';
import Reviews from '../Reviews';
// import PropTypes from 'prop-types';
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
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    themoviedbApi
      .fetchMoviesDetails(movieId)
      .then(response => setMovie(response.data))
      .catch(error => console.log(error.message));
  }, [movieId]);

  const { title, overview, date, votes, genres, poster } = getValues(movie);
  const isMovie = Object.keys(movie).length;

  return (
    isMovie && (
      <div className={css.container}>
        {/* <button className={css.button} type="button">
          Go back
        </button> */}
        <NavLink to="/" className={css.goBackBtn}>
          Go back
        </NavLink>
        <div>
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
        </div>
        <div>
          <div className={css.additionalInfo}>
            <h4>Additional information</h4>
            <ul>
              <li>
                <Link to={`${url}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`${url}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path={`${url}/cast`}>
              <Cast movieId={movieId} />
            </Route>
            <Route path={`${url}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Switch>
        </div>
      </div>
    )
  );
};

export default MovieDetailsPage;

MovieDetailsPage.propTypes = {};

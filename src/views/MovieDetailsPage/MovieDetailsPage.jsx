import { useState, useEffect, useRef } from 'react';
import {
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
  Switch,
  Route,
} from 'react-router-dom';
import Cast from '../../components/Cast';
import Reviews from '../../components/Reviews';
// import PropTypes from 'prop-types';
import css from './MovieDetailsPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MovieCard from '../../components/MovieCard';
import MovieAdditionalInfo from '../../components/MovieAdditionalInfo';

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
const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const prevLocation = useRef(null);

  // useEffect(() => {
  //   const state = history.location.state;
  //   if (state) prevLocation.current = state;
  // }, [history.location.state]);

  useEffect(() => {
    themoviedbApi
      .fetchMoviesDetails(movieId)
      .then(responseData => setMovie(responseData.data))
      .catch(error => console.log(error.message));
  }, [movieId]);

  const handleGoBack = () => {
    // const { state } = location;
    // const { pathname, search } = prevLocation.current;
    // console.log(state.from);
    // if (state) {
    //   history.push(state.from);
    //   return;
    // }
    // console.log(history);
    // history.push({ pathname: pathname, search: search });
  };

  const isMovie = Object.keys(movie).length;

  return (
    isMovie && (
      <div className={css.container}>
        <div>
          <button className={css.button} type="button" onClick={handleGoBack}>
            Go back
          </button>
          <MovieCard movie={getValues(movie)} />
        </div>
        <div>
          <MovieAdditionalInfo url={url} />
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

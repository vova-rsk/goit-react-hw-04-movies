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
import css from './MovieDetailsPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MovieCard from '../../components/Movies/MovieCard';
import MovieAdditionalInfo from '../../components/Movies/MovieAdditionalInfo';
import { BsArrowLeft } from 'react-icons/bs';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const customState = useRef(null);
  const isMovie = Boolean(Object.keys(movie).length);

  /*Saving location for to go back*/
  useEffect(() => {
    if (location.state) customState.current = { ...location.state };
  }, [location]);

  /*fetch movie by id*/
  useEffect(() => {
    themoviedbApi
      .fetchMovie(movieId)
      .then(responseData => {
        const data = responseData.data;
        if (data) setMovie(data);
      })
      .catch(error => console.log(error.message));
  }, [movieId]);

  /*func to return*/
  const handleGoBack = () => {
    customState.current
      ? history.push(customState.current.from)
      : history.push({ pathname: '/movies', search: '' });
  };

  return (
    isMovie && (
      <div className={css.container}>
        <div>
          <button className={css.button} type="button" onClick={handleGoBack}>
            <BsArrowLeft className={css.arrow} />
            <span className={css.label}>Go back</span>
          </button>
          <MovieCard movie={movie} />
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

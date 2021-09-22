import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import {
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
  Switch,
  Route,
} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import css from './MovieDetailsPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MovieCard from '../../components/Movies/MovieCard';
import MovieAdditionalInfo from '../../components/Movies/MovieAdditionalInfo';
import Loader from '../../components/Loader';
import { STATUS } from '../../common/variables';

const Cast = lazy(() => import('../../components/Cast'));
const Reviews = lazy(() => import('../../components/Reviews'));

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [status, setStatus] = useState(STATUS.IDLE);
  const customState = useRef(null);

  const isMovie = Boolean(Object.keys(movie).length);

  /*Saving location for to go back*/
  useEffect(() => {
    if (location.state) customState.current = { ...location.state };
  }, [location]);

  /*fetch movie by id*/
  useEffect(() => {
    setStatus(STATUS.PENDING);
    themoviedbApi
      .fetchMovie(movieId)
      .then(responseData => {
        const data = responseData.data;
        if (data) setMovie(data);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.log(error.message);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);

  /*func to return*/
  const handleGoBack = () => {
    customState.current
      ? history.push(customState.current.from)
      : history.push({ pathname: '/movies', search: '' });
  };

  if (status === STATUS.REJECTED) return <div>Error</div>;
  if (status === STATUS.PENDING) return <Loader />;

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
          <Suspense fallback={<Loader type="Watch" size="30" />}>
            <Switch>
              <Route path={`${url}/cast`}>
                <Cast movieId={movieId} />
              </Route>
              <Route path={`${url}/reviews`}>
                <Reviews movieId={movieId} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    )
  );
};

export default MovieDetailsPage;

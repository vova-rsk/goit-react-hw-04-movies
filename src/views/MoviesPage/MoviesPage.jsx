import { useState, useEffect } from 'react';
import {
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import css from './MoviesPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/Movies/MoviesList';
import SearchingForm from '../../components/SearchingForm';
import Loader from '../../components/Loader';
import { STATUS } from '../../common/variables';
import notification from '../../common/notification';

const MoviesPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [status, setStatus] = useState(STATUS.IDLE);

  /*fetching movies by query-key*/
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');

    if (query) {
      console.log(query);
      if (!query) return;
      setStatus(STATUS.PENDING);

      themoviedbApi
        .fetchMovies(query)
        .then(responseData => {
          const data = responseData.data.results;
          if (data.length === 0) notification('No items found');
          setSearchResult(data);
          setStatus(STATUS.RESOLVED);
        })
        .catch(error => {
          console.log(error.message);
          setStatus(STATUS.REJECTED);
        });
    } else {
      setSearchResult([]);
    }
  }, [location.search]);

  /*func for changing current location*/
  const searching = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  // if (status === STATUS.PENDING) return <Loader />;
  if (status === STATUS.REJECTED) return <div>Error</div>;

  return (
    <div className={css.container}>
      <SearchingForm searching={searching} />
      <ToastContainer />
      {status === STATUS.PENDING && <Loader />}
      <Route path={`${url}`}>
        {searchResult && <MoviesList url={url} movies={searchResult} />}
      </Route>
    </div>
  );
};

export default MoviesPage;

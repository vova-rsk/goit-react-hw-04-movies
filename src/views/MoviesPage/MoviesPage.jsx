import { useState, useEffect } from 'react';
import {
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from 'react-router-dom';
import css from './MoviesPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/Movies/MoviesList';
import SearchingForm from '../../components/SearchingForm';

const MoviesPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  /*fetching movies by query-key*/
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');

    if (query) {
      themoviedbApi
        .fetchSearchMovies(query)
        .then(responseData => {
          const data = responseData.data.results;
          if (data) setSearchResult(data);
        })
        .catch(error => console.log(error.message));
    } else {
      setSearchResult([]);
    }
  }, [location.search]);

  /*func for changing current location*/
  const searching = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <div className={css.container}>
      <SearchingForm searching={searching} />
      <Route path={`${url}`}>
        {searchResult && (
          <MoviesList url={url} movies={searchResult} hash={location} />
        )}
      </Route>
    </div>
  );
};

export default MoviesPage;

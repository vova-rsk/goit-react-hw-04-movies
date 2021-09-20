import { useState, useEffect } from 'react';
import {
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from 'react-router-dom';
import css from './MoviesPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/MoviesList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
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
          if (data) {
            setSearchResult(data);
            setQuery('');
          }
        })
        .catch(error => console.log(error.message));
    }
  }, [location.search]);

  /*func for form submiting*/
  const handleSubmit = e => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;
    history.push({ ...location, search: `query=${currentQuery}` });
  };

  return (
    <div>
      <div className={css.container}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>

      <Route path={`${url}`}>
        {searchResult && (
          <MoviesList url={url} movies={searchResult} hash={location} />
        )}
      </Route>
    </div>
  );
};

export default MoviesPage;

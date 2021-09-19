import { useState } from 'react';
import {
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from 'react-router-dom';
import css from './MoviesPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import MoviesList from '../../components/MoviesList';

function MoviesPage(props) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;

    history.push({ ...location, search: `query=${query}` });
    themoviedbApi
      .fetchSearchMovies(query)
      .then(responseData => setSearchResult(responseData.data.results))
      .catch(error => console.log(error.message));
  };

  const currentLocation = location;
  return (
    <div>
      <div className={css.container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <Route path={`${url}`}>
        {searchResult && (
          <MoviesList url={url} movies={searchResult} hash={currentLocation} />
        )}
      </Route>
    </div>
  );
}

export default MoviesPage;

import { useState } from 'react';
import { useRouteMatch, useParams, Link, Route } from 'react-router-dom';
import css from './MoviesPage.module.css';
import themoviedbApi from '../../services/themoviedb-api';

function MoviesPage(props) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { url } = useRouteMatch();
  const params = useParams();

  const handleSubmit = e => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;
    themoviedbApi
      .fetchSearchMovies(query)
      .then(responseData => setSearchResult(responseData.data.results))
      .catch(error => console.log(error.message));
  };

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

      {/* <Route path={`${url}&query=${query}`}> */}
      <div>
        {searchResult && (
          <ul>
            {searchResult.map(movie => (
              <li key={movie.id}>
                <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* </Route> */}
    </div>
  );
}

export default MoviesPage;

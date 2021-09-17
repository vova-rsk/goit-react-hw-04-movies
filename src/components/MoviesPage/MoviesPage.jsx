import { useState } from 'react';
import css from './MoviesPage.module.css';

function MoviesPage(props) {
  const [query, setQuery] = useState('');

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const currentQuery = query.trim();
  //   if (!currentQuery) return;

  //  };

  return (
    <div className={css.container}>
      <form>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default MoviesPage;

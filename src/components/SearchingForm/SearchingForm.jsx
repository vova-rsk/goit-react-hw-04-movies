import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchingForm.module.css';

function SearchingForm({ searching }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const currentQuery = query.trim();
    if (!currentQuery) return;
    searching(currentQuery);
    setQuery('');
  };

  return (
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
  );
}

export default SearchingForm;

SearchingForm.propTypes = {
  searching: PropTypes.func.isRequired,
};

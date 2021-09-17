import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import css from './Reviews.module.css';
import themoviedbApi from '../../services/themoviedb-api';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    themoviedbApi
      .fetchMoviesReviews(movieId)
      .then(response => setReviews(response.data.results))
      .catch(error => console.log(error.message));
  }, [movieId]);

  if (reviews.length) {
    return (
      <div>
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h5>Author: {author}</h5>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <p>We dont have any reviews for this movie</p>
      </div>
    );
  }
}

export default Reviews;

Reviews.propTypes = {
  movieId: PropTypes.string,
};

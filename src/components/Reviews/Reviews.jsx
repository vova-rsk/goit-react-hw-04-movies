import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import themoviedbApi from '../../services/themoviedb-api';
import Loader from '../Loader';
import { STATUS } from '../../common/variables';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    setStatus(STATUS.PENDING);
    themoviedbApi
      .fetchReviews(movieId)
      .then(responseData => {
        setReviews(responseData.data.results);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.log(error.message);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);

  if (status === STATUS.PENDING) return <Loader type="Watch" size="30" />;
  if (status === STATUS.REJECTED) return <div>Error</div>;
  if (reviews === null) return null;

  if (reviews.length) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <div>
        <p>We dont have any reviews for this movie</p>
      </div>
    );
  }
};

export default Reviews;

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

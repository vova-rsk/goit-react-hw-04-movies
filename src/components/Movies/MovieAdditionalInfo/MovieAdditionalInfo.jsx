import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieAdditionalInfo.module.css';

const MovieAdditionalInfo = ({ url }) => {
  return (
    <div className={css.additionalInfo}>
      <h4>Additional information</h4>
      <ul>
        <li>
          <Link to={`${url}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`${url}/reviews`}>Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

export default MovieAdditionalInfo;

MovieAdditionalInfo.propTypes = {
  url: PropTypes.string.isRequired,
};

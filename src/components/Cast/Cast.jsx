import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Cast.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import defaultProfile from './default-profile.jpeg';
import Loader from '../Loader';
import { STATUS } from '../../common/variables';

const ACTORS_SHOW_LIMIT = 10;

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  /*fetching casts by movie id*/
  useEffect(() => {
    setStatus(STATUS.PENDING);
    themoviedbApi
      .fetchCredits(movieId)
      .then(responseData => {
        setCast(actorsFiltering(responseData.data.cast));
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.log(error.message);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);

  /*func for gettinq first N actors from the total number*/
  const actorsFiltering = actors => {
    return actors.reduce((acc, actor) => {
      const { known_for_department: role } = actor;
      if (acc.length >= ACTORS_SHOW_LIMIT || role !== 'Acting') return [...acc];
      return [...acc, actor];
    }, []);
  };

  if (status === STATUS.PENDING) return <Loader type="Watch" size="30" />;
  if (status === STATUS.REJECTED) return <div>Error</div>;

  return (
    cast && (
      <div>
        <ul>
          {cast.map(({ id, name, character, profile_path: profilePath }) => (
            <li key={id}>
              <div>
                <p>{name}</p>
                <p>Character: {character}</p>
              </div>
              <div className={css.imgThumb}>
                <img
                  src={profilePath ?? defaultProfile}
                  alt={name}
                  className={css.image}
                  width="120"
                  height="160"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Cast;

Cast.propTypes = {
  movieId: PropTypes.string,
};

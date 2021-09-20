import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Cast.module.css';
import themoviedbApi from '../../services/themoviedb-api';
import defaultProfile from './default-profile.jpeg';

const ACTORS_SHOW_LIMIT = 10;

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  /*fetching casts by movie id*/
  useEffect(() => {
    themoviedbApi
      .fetchCredits(movieId)
      .then(responseData => setCast(actorsFiltering(responseData.data.cast)))
      .catch(error => console.log(error.message));
  }, [movieId]);

  /*func for gettinq first N actors from the total number*/
  const actorsFiltering = actors => {
    return actors.reduce((acc, actor) => {
      const { known_for_department: role } = actor;
      if (acc.length >= ACTORS_SHOW_LIMIT || role !== 'Acting') return [...acc];
      return [...acc, actor];
    }, []);
  };

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

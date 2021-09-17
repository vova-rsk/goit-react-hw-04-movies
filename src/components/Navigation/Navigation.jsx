import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={css.container}>
      <NavLink
        to="/"
        className={css.link}
        activeClassName={css.activeLink}
        exact
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={css.link}
        activeClassName={css.activeLink}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;

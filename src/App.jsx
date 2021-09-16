import { Switch, Route } from 'react-router-dom';
import css from './App.module.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';
import PageError from './components/PageError';

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
        <Route>
          <PageError />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

import { Switch, Route } from 'react-router-dom';
import css from './App.module.css';
import Navigation from './components/Navigation';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';
import PageError from './views/PageError';

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/movies" component={MoviesPage} exact />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={PageError} />
      </Switch>
    </div>
  );
}

export default App;

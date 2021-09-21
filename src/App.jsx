import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import css from './App.module.css';
import Navigation from './components/Navigation';
import LoaderSpinner from './components/Loader/Loader';

const HomePage = lazy(() => import('./views/HomePage'));
const MoviesPage = lazy(() => import('./views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage'));
const PageError = lazy(() => import('./views/PageError'));

function App() {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/movies" component={MoviesPage} exact />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={PageError} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;

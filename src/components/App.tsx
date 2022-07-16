import React from 'react';
import Main from './pages/main/main';
import MoviePage from './pages/movie-page/movie-page';
import MyList from './pages/my-list/my-list';
import Player from './pages/player/player';
import SignIn from './pages/sign-in/sign-in';
import AddReview from './pages/add-review/add-review';
import NotFound from './UI/not-found/not-found';
import RequireAuth from './business/require-auth/require-auth';
import Layout from './business/layout/layout';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const/app-route';
import { HistoryRouter } from './business/history-route/history-route';
import { browserHistory } from '../services/browser-history';


function App() {

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path = '/' element={<Layout />}>
          <Route path={AppRoute.Main} element={<Main />} />
          <Route
            path={AppRoute.MyList}
            element={
              <RequireAuth>
                <MyList />
              </RequireAuth>
            }
          />
          <Route
            path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
            element={
              <RequireAuth>
                <AddReview />
              </RequireAuth>
            }
          />
          <Route path={`${AppRoute.Film}/:id`} element={<MoviePage />} />
          <Route path={`${AppRoute.Player}/:id`} element={<Player />} />
          <Route path={AppRoute.SignIn} element={<SignIn />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;

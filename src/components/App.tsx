import React from 'react';
import Main from './main/main';
import MoviePage from './movie-page/movie-page';
import MyList from './my-list/my-list';
import Player from './player/player';
import SignIn from './sign-in/sign-in';
import AddReview from './add-review/add-review';
import NotFound from './not-found/not-found';
import RequireAuth from './require-auth/require-auth';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const/app-route';
import { HistoryRouter } from './history-route/history-route';
import { browserHistory } from '../services/browser-history';
import Layout from './layout/layout';

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

import React from 'react';
import Main from './main/main';
import MoviePage from './movie-page/movie-page';
import MyList from './my-list/my-list';
import Player from './player/player';
import SignIn from './sign-in/sign-in';
import AddReview from './add-review/add-review';
import NotFound from './not-found/not-found';
import RequireAuth from './HOC/require-auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const/app-route';
import { AuthorizationStatus } from '../const/authorization-status';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <RequireAuth authorizationStatus={AuthorizationStatus.Auth}>
              <MyList />
            </RequireAuth>
          }
        />
        <Route
          path={`${AppRoute.Film}/:id${AppRoute.AddReview}`}
          element={
            <RequireAuth authorizationStatus={AuthorizationStatus.Auth}>
              <AddReview />
            </RequireAuth>
          }
        />
        <Route path={`${AppRoute.Film}/:id`} element={<MoviePage />} />
        <Route path={`${AppRoute.Player}/:id`} element={<Player />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

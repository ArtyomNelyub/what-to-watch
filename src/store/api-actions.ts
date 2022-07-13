import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { APIRoute } from '../const/api-route';
import { AppRoute } from '../const/app-route';
import { AuthorizationStatus } from '../const/authorization-status';
import { TIMEOUT_SHOW_ERROR } from '../const/timeout-show-error';
import { errorHandle } from '../services/error-handle';
import { dropToken, saveToken } from '../services/token';
import { dropUserData, saveUserData } from '../services/user-data';

import {
  addErrorMessage,
  redirectToRoute,
  requireAuthorization,
  setComments,
  setCurrentFilm,
  setFilms,
  setSimilarFilms,
} from './action';

import { Film } from '../types/film';
import { Comment, NewComment } from '../types/comment';
import { AppDispatch, State } from '../types/state';
import { AuthData, UserData } from '../types/user';

export const clearErrorAction = createAsyncThunk('app/clearErrorAction', () => {
  setTimeout(() => store.dispatch(addErrorMessage('')), TIMEOUT_SHOW_ERROR);
});

export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilms(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchSimilarFilms = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film[]>(`${APIRoute.Films}/${id}${APIRoute.Similar}`);
    dispatch(setSimilarFilms(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchCurrentFilm = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCurrentFilm', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    dispatch(setCurrentFilm(data));
  } catch (error) {
    dispatch(redirectToRoute('/404'))
  }
});



export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch (error) {
    errorHandle(error);
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  try {
    const {
      data: { token, avatarUrl, email: login, name },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    saveUserData({ avatarUrl, email: login, name });
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  } catch (error) {
    errorHandle(error);
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserData();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  } catch (error) {
    errorHandle(error);
  }
});

export const fetchComments = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (id, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setComments(data));
  } catch (error) {
    errorHandle(error);
  }
});

export const sendComment = createAsyncThunk<
  void,
  NewComment,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/sendComment',
  async ({ comment, filmId, rating }, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Comments}/${filmId}`, { comment, rating });
      dispatch(redirectToRoute(`${AppRoute.Film}/${filmId}`))
    } catch (error) {
      errorHandle(error);
    }
  }
);

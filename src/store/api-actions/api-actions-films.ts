import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const/api-route';
import { errorHandle } from '../../services/error-handle';
import { redirectToRoute } from '../action';
import { Film } from '../../types/film';
import { AppDispatch, State } from '../../types/state';
import {
  setFilms,
  setCurrentFilm,
  setPromoFilm,
  setSimilarFilms,
} from '../data-process/data-process';

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
    const { data } = await api.get<Film[]>(
      `${APIRoute.Films}/${id}${APIRoute.Similar}`
    );
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
    dispatch(redirectToRoute('/404'));
  }
});

export const fetchPromoFilm = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film>(APIRoute.Promo);
    dispatch(setPromoFilm(data));
  } catch (error) {
    errorHandle(error);
  }
});

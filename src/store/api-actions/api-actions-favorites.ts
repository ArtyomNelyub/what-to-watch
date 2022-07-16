import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const/api-route';
import { errorHandle } from '../../services/error-handle';
import { Film } from '../../types/film';
import { AppDispatch, State } from '../../types/state';
import {
  setCurrentFilm,
  setPromoFilm,
  setFavorites,
  changeFavoritesLoadedStatus,
} from '../data-process/data-process';

export const fetchFavorites = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Film[]>(APIRoute.Favorite);
    dispatch(setFavorites(data));
    dispatch(changeFavoritesLoadedStatus(true));
  } catch (error) {
    errorHandle(error);
  }
});

export const changeFavoriteStatus = createAsyncThunk<
  void,
  {
    id: string;
    status: string;
    fromPromo: boolean;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({ id, status, fromPromo }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Film>(
        `${APIRoute.Favorite}/${id}/${status}`
      );
      fromPromo ? dispatch(setPromoFilm(data)) : dispatch(setCurrentFilm(data));
      dispatch(changeFavoritesLoadedStatus(false));
    } catch (error) {
      errorHandle(error);
    }
  }
);

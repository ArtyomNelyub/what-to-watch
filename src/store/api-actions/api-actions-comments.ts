import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const/api-route';
import { AppRoute } from '../../const/app-route';
import { errorHandle } from '../../services/error-handle';
import { redirectToRoute } from '../action';
import { setComments } from '../data-process/data-process';
import { Comment, NewComment } from '../../types/comment';
import { AppDispatch, State } from '../../types/state';

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
      dispatch(redirectToRoute(`${AppRoute.Film}/${filmId}`));
    } catch (error) {
      errorHandle(error);
    }
  }
);

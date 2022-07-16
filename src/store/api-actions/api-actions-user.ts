import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '..';
import { APIRoute } from '../../const/api-route';
import { AppRoute } from '../../const/app-route';
import { AuthorizationStatus } from '../../const/authorization-status';
import { TIMEOUT_SHOW_ERROR } from '../../const/timeout-show-error';
import { errorHandle } from '../../services/error-handle';
import { dropUserData, saveUserData } from '../../services/user-data';
import { redirectToRoute } from '../action';
import { addErrorMessage } from '../app-process/app-process';
import { requireAuthorization } from '../user-process/user-process';
import { AppDispatch, State } from '../../types/state';
import { AuthData, UserData } from '../../types/user';

export const clearErrorAction = createAsyncThunk('app/clearErrorAction', () => {
  setTimeout(() => store.dispatch(addErrorMessage('')), TIMEOUT_SHOW_ERROR);
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    errorHandle(error);
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
    saveUserData({ avatarUrl, email: login, name, token });
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
    dropUserData();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  } catch (error) {
    errorHandle(error);
  }
});

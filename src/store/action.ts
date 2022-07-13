import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const/authorization-status';
import { Comment } from '../types/comment';
import { Film } from '../types/film';

export const setGenre = createAction<string>('app/setGenre');
export const addErrorMessage = createAction<string>('app/addErrorMessage');
export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const setCurrentFilm = createAction<Film>('data/setFilm');
export const setFilms = createAction<Film[]>('data/setFilms');
export const setSimilarFilms = createAction<Film[]>('data/setSimilarFilms');
export const setComments = createAction<Comment[]>('data/setComments');
export const changeSimilarFilmsStatus = createAction<boolean>('data/changeSimilarFilmStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

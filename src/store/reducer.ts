import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const/authorization-status';
import { Film } from '../types/film';
import { Comment } from '../types/comment';
import { ALL_GENRES } from '../const/all-genres';
import {
  requireAuthorization,
  setFilms,
  setSimilarFilms,
  setGenre,
  addErrorMessage,
  setCurrentFilm,
  setComments,
  changeSimilarFilmsStatus,
} from './action';

type InitialState = {
  currentGenre: string;
  films: Film[];
  isDataLoaded: boolean;
  similarFilms: Film[];
  isSimilarFilmsLoaded: boolean;
  currentFilm: Film | null;
  isFilmLoaded: boolean;
  currentComments: Comment[];
  authorizationStatus: AuthorizationStatus;
  error: string;
};

const initialState: InitialState = {
  currentGenre: ALL_GENRES,
  films: [],
  similarFilms: [],
  isDataLoaded: false,
  currentFilm: null,
  isSimilarFilmsLoaded: false,
  isFilmLoaded: false,
  currentComments: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  error: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.currentGenre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
      state.isSimilarFilmsLoaded = true;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
      state.isFilmLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(addErrorMessage, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.currentComments = action.payload;
    })
    .addCase(changeSimilarFilmsStatus, (state, action) => {
      state.isSimilarFilmsLoaded = action.payload;
    });
});

export { reducer };

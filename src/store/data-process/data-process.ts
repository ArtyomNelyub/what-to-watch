import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/name-space';
import { DataProcess } from '../../types/state';

const initialState: DataProcess = {
  films: [],
  currentFilm: null,
  promoFilm: null,
  similarFilms: [],
  currentComments: [],
  favorites: [],
  isFilmsLoaded: false,
  isCurrentFilmLoaded: false,
  isFavoritesLoaded: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload;
      state.isFilmsLoaded = true;
    },
    setCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    setPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    setSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    setComments: (state, action) => {
      state.currentComments = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeCurrentFilmDataStatus: (state, action) => {
      state.isCurrentFilmLoaded = action.payload;
    },
    changeFavoritesLoadedStatus: (state, action) => {
      state.isFavoritesLoaded = action.payload;
    },
  },
});

export const {
  setFilms,
  setCurrentFilm,
  setPromoFilm,
  setSimilarFilms,
  setComments,
  setFavorites,
  changeCurrentFilmDataStatus,
  changeFavoritesLoadedStatus,
} = dataProcess.actions;

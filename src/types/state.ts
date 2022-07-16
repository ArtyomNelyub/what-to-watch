import { AuthorizationStatus } from '../const/authorization-status.js';
import {store} from '../store/index.js';
import { Film } from './film.js';
import {Comment} from './comment';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type AppProcess = {
  currentGenre: string;
  error: string;
};

export type DataProcess = {
  films: Film[];
  similarFilms: Film[];
  currentFilm: Film | null;
  promoFilm: Film | null;
  currentComments: Comment[];
  favorites: Film[];
  isFilmsLoaded: boolean;
  isCurrentFilmLoaded: boolean;
  isFavoritesLoaded: boolean;
};
import { NameSpace } from '../../const/name-space';
import { Film } from '../../types/film';
import { State } from '../../types/state';
import { Comment } from '../../types/comment';

export const getFilms = (state: State): Film[] => state[NameSpace.Data].films;
export const getCurrentFilm = (state: State): Film | null => state[NameSpace.Data].currentFilm;
export const getPromoFilm = (state: State): Film | null => state[NameSpace.Data].promoFilm;
export const getSimilarFilms = (state: State): Film[] => state[NameSpace.Data].similarFilms;
export const getComments = (state: State): Comment[] => state[NameSpace.Data].currentComments;
export const getFavorites = (state: State): Film[] => state[NameSpace.Data].favorites;
export const getIsFilmsLoaded = (state: State): boolean => state[NameSpace.Data].isFilmsLoaded;
export const getIsCurrentFilmLoaded = (state: State): boolean => state[NameSpace.Data].isCurrentFilmLoaded;
export const getIsFavoritesLoaded = (state: State): boolean => state[NameSpace.Data].isFavoritesLoaded;

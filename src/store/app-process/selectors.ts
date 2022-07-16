import { NameSpace } from '../../const/name-space';
import { State } from '../../types/state';

export const getCurrentGenre = (state: State): string => state[NameSpace.App].currentGenre;
export const getError = (state: State): string => state[NameSpace.App].error;
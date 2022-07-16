import { AuthorizationStatus } from '../../const/authorization-status';
import { NameSpace } from '../../const/name-space';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
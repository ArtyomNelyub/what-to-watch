import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const/authorization-status';
import { NameSpace } from '../../const/name-space';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { requireAuthorization } = userProcess.actions;

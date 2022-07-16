import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/name-space';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  currentGenre: '',
  error: '',
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.currentGenre = action.payload;
    },
    addErrorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGenre, addErrorMessage } = appProcess.actions;

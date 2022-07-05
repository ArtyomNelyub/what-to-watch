import { createReducer } from '@reduxjs/toolkit';
import { setGenre } from './action';
import { mockFilms } from '../mocks/mock-films';

const initialState = {
  currentGenre: 'All genres',
  films: mockFilms,
}

const reducer = createReducer(initialState, (builder)=>{
  builder
    .addCase(setGenre, (state, action) => {
      state.currentGenre = action.payload;
    })
})

export {reducer};
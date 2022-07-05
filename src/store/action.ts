import { createAction } from '@reduxjs/toolkit';

export const setGenre = createAction<string>('app/setGenre');
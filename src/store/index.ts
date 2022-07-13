import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';
import { reducer } from './reducer';

export const api = createAPI();
const middleware = [redirect];

export const store = configureStore({
  reducer,
  middleware: (gDM) =>
    gDM({
      thunk: {
        extraArgument: api,
      },
    }).concat(middleware),
});

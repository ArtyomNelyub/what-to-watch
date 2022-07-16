import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';
import { rootReducer } from './root-reducer';

export const api = createAPI();
const middleware = [redirect];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) =>
    gDM({
      thunk: {
        extraArgument: api,
      },
    }).concat(middleware),
});

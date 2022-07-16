import { Middleware } from '@reduxjs/toolkit';
import { browserHistory } from '../../services/browser-history';
import { rootReducer } from '../root-reducer';

type RootReducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, RootReducer> =
  (_store) => (next) => (action) => {
    if (action.type === 'app/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };

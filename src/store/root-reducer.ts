import { combineReducers } from '@reduxjs/toolkit';
import { data } from './slices/data/reducers';
import { config } from './slices/config/reducers';
import { basket } from './slices/basket/reducers';

export const rootReducer = combineReducers({
  data,
  config,
  basket,
});

export type TState = ReturnType<typeof rootReducer>;

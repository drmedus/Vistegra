import { createReducer } from '@reduxjs/toolkit';
import { setConfig } from './actions';
import { IConfig } from '../../../types';

export const initialState: Array<IConfig> = [];

export const config = createReducer(initialState, (builder) => {
  builder.addCase(setConfig, (state, action) => [...action.payload]);
});

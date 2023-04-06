import { createReducer } from '@reduxjs/toolkit';
import { setData } from './actions';
import { IData } from '../../../types/data';

export const initialState: Array<IData> = [];

export const data = createReducer(initialState, (builder) => {
  builder.addCase(setData, (state, action) => [...action.payload]);
});

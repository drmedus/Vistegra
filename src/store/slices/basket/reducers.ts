import { createReducer } from '@reduxjs/toolkit';
import { addToBasket } from './actions';
import { TProduct } from '../../../types';

export const initialState: Array<TProduct> = [];

export const basket = createReducer(initialState, (builder) => {
  builder.addCase(addToBasket, (state, action) => [...state, action.payload]);
});

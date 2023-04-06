import { createAction } from '@reduxjs/toolkit';
import { TProduct } from '../../../types';

export const addToBasket = createAction<TProduct>('basket/addToBasket');

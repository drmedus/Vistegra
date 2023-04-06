import { createAction } from '@reduxjs/toolkit';
import { IData } from '../../../types/data';

export const setData = createAction<Array<IData>>('data/setData');

export const requestData = createAction('data/requestData');
export const requestDataSuccess = createAction('data/requestDataSuccess');
export const requestDataFailure = createAction('data/requestDataFailure');

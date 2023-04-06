import { createAction } from '@reduxjs/toolkit';
import { IConfig } from '../../../types';

export const setConfig = createAction<Array<IConfig>>('data/setConfig');

export const requestConfig = createAction('data/requestConfig');
export const requestConfigSuccess = createAction('data/requestConfigSuccess');
export const requestConfigFailure = createAction('data/requestConfigFailure');

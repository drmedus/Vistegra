import { TState } from '../../root-reducer';

export const selectLists = ({ data }: TState) => data.filter((item) => item.type === 'list');
export const selectPipes = ({ data }: TState) => data.filter((item) => item.type === 'pipe');
export const selectFix = ({ data }: TState) => data.filter((item) => item.type === 'fix');

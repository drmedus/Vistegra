import { TState } from '../../root-reducer';

export const selectSizes = ({ config }: TState) => config.filter((item) => item.type === 'size');
export const selectFrames = ({ config }: TState) => config.filter((item) => item.type === 'frame');
export const selectMaterials = ({ config }: TState) => config.filter((item) => item.type === 'material');
export const selectFixConfig = ({ config }: TState) => config.filter((item) => item.type === 'fix');

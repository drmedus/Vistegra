export interface IData {
  type: TDataType;
  name: string;
  material: TDataMaterial;
  unit?: TDataUnit;
  width?: number;
  price?: number;
}

export type TDataType = 'list' | 'pipe' | 'fix';
export type TDataMaterial = 'plastic' | 'metal';
export type TDataUnit = 'м2' | 'мп' | 'шт';

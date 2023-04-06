export interface ICalculatorFormValues {
  frame: number;
  length: number;
  sheet: number;
  pipe: number;
  width: number;
}

export interface IProductItem {
  name: string;
  unit: string;
  value: string;
  summ: string;
}

export type TProduct = Array<IProductItem>;

export interface ICalculationResult {
  cellSize: string;
  placeArea: string;
  numberOfSheets: string;
  product: TProduct;
}

export interface IConfig {
  type: TConfigType;
  key: TConfigKey;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

export type TConfigType = 'size' | 'frame' | 'material' | 'fix';
export type TConfigKey = 'length' | 'width' | 'light' | 'standard' | 'strong' | 'metal' | 'plastic';

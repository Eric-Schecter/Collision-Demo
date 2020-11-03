export type SettingType =
  | 'SCALE'
  | 'BGFILL'
  | 'NEXTOPERATION'
  | 'PREOPERATION'
  | 'CREATEOPTION'

export type SettingPayload = {
  scale: number;
  bgFill: string;
  hasNextOperation: boolean;
  hasPreOperation: boolean;
  createOption: number;
}

export type SettingAction = {
  type: SettingType,
  payload: SettingPayload,
}
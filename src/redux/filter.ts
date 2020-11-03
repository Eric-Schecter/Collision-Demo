import { SettingPayload, ParamPayload } from './types';

type DataProps = {
  settingReducer: SettingPayload,
  paramReducer: ParamPayload,
}

export const getSetting = ({ settingReducer }: DataProps) => settingReducer;
export const getParam = ({ paramReducer }: DataProps) => paramReducer;
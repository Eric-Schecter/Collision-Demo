import { SettingAction, SettingPayload } from "../types";

const initState: SettingPayload = {
  scale: 100,
  bgFill: '#ffffff',
  hasNextOperation: true,
  hasPreOperation: true,
  createOption: -1,
};

export const settingReducer = (state = initState, action: SettingAction) => {
  switch (action.type) {
    case 'SCALE': {
      return {
        ...state,
        ...{ scale: action.payload }
      };
    }
    case 'BGFILL': {
      return {
        ...state,
        ...{ bgFill: action.payload }
      };
    }
    case 'NEXTOPERATION': {
      return {
        ...state,
        ...{ hasNextOperation: action.payload }
      };
    }
    case 'PREOPERATION': {
      return {
        ...state,
        ...{ hasPreOperation: action.payload }
      };
    }
    case 'CREATEOPTION': {
      return {
        ...state,
        ...{ createOption: action.payload }
      };
    }
    default:
      return state;
  }
};

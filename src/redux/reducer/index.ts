import { combineReducers } from 'redux';
import { settingReducer } from './settingReducer';
import { paramReducer } from './paramReducer';
export default combineReducers({ settingReducer, paramReducer });
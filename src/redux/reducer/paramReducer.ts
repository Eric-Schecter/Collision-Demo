import { ParamAction, ParamPayload } from "../types";
import { defaultFill, defaultStroke } from "../../shared";

const initState: ParamPayload = {
  fill: defaultFill,
  font: "Arial",
  height: 0,
  imgData: "",
  isRotateX: false,
  isRotateY: false,
  stroke: defaultStroke,
  type: "triangle",
  width: 0,
  linewidth:0,
  x: 0,
  y: 0,
};

export const paramReducer = (state = initState, action: ParamAction) => {
  switch (action.type) {
    case 'UPDATEALL': {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'UPDATESHAPEFILL': {
      return {
        ...state,
        ...{ fill: action.payload }
      };
    }
    case 'UPDATESHAPESTROKE': {
      return {
        ...state,
        ...{ stroke: action.payload }
      };
    }
    case 'UPDATEWIDTH': {
      return {
        ...state,
        ...{ width: action.payload }
      };
    }
    case 'UPDATEHEIGHT': {
      return {
        ...state,
        ...{ height: action.payload }
      };
    }
    case 'UPDATELINEWIDTH':{
      return {
        ...state,
        ...{ linewidth: action.payload }
      };
    }
    default:
      return state;
  }
};

import { ParamPayload } from "../types";

export const updateAll = (value:ParamPayload) => ({
  type: 'UPDATEALL',
  payload: value,
})

export const updateShapeFill = (value:string) => ({
  type: 'UPDATESHAPEFILL',
  payload: value,
})

export const updateShapeStroke = (value:string) => ({
  type: 'UPDATESHAPESTROKE',
  payload: value,
})

export const updateWidth = (value:string) => ({
  type: 'UPDATEWIDTH',
  payload: value,
})

export const updateHeight = (value:string) => ({
  type: 'UPDATEHEIGHT',
  payload: value,
})

export const updateLineWidth = (value:string) => ({
  type: 'UPDATELINEWIDTH',
  payload: value,
})
export type ParamType =
  | 'UPDATEALL'
  | 'UPDATESHAPEFILL'
  | 'UPDATESHAPESTROKE'
  | 'UPDATEWIDTH'
  | 'UPDATEHEIGHT'
  | 'UPDATELINEWIDTH'

export type ParamPayload = {
  fill: string,
  font: string,
  height: number,
  imgData: string,
  isRotateX: boolean,
  isRotateY: boolean,
  stroke: string,
  type: string,
  width: number,
  linewidth:number,
  x: number,
  y: number,
}

export type ParamAction = {
  type: ParamType,
  payload: ParamPayload,
}
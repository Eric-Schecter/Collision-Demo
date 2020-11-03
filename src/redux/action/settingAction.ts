export const updateScale = (value:number) => ({
  type: 'SCALE',
  payload: value,
})

export const updateBgFill = (value:string) => ({
  type: 'BGFILL',
  payload: value,
})

export const updateNextOperation = (value:boolean) => ({
  type: 'NEXTOPERATION',
  payload: value,
})

export const updatePreOperation = (value:boolean) => ({
  type: 'PREOPERATION',
  payload: value,
})

export const updateCreateOption = (value:number) => ({
  type: 'CREATEOPTION',
  payload: value,
})
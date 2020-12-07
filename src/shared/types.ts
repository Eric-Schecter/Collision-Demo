export type Pos2D = {
  x: number,
  z: number,
}

export type Pos3D = {
  x: number,
  y: number,
  z: number,
}

export type Size = {
  width: number,
  height: number,
  depth: number,
}

export type Size2D = {
  width: number,
  depth: number,
}

export type ObjectType =
  | 'default'
  | 'wall'
  | 'npc'
  | 'box'
  | 'road'

export type ObjData = {
  type: ObjectType,
  pos: Pos2D,
  size: Size,
  rotation: number,
}

export type RoadData = {
  pos: {
    x: number,
    z: number,
  },
  size: {
    width: number,
    depth: number,
  },
  texturePath: string,
  repeat: {
    x: number,
    y: number,
  },
  rotation: number,
}

export enum Directions {
  north = 87,
  south = 83,
  west = 65,
  east = 68,
}

export type Index = {
  rowIndex: number,
  colIndex: number,
}
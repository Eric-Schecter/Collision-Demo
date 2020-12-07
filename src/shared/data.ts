import { ObjData } from "./types";

export const rowNum = 500;
export const colNum = 500;
export const mapParams = {
  x:-25,
  z:-25,
  width:50,
  height:50,
}

export const data: ObjData[] = [
  {
    type: 'wall',
    pos: { x: -25, z: -25 },
    size: { width: 50, height: 2, depth: 0.1 },
    rotation: 0,
  },
  {
    type: 'wall',
    pos: { x: -25, z: 24.9 },
    size: { width: 50, height: 2, depth: 0.1 },
    rotation: 0,
  },
  {
    type: 'wall',
    pos: { x: -25, z: -24.9 },
    size: { width: 49.8, height: 2, depth: 0.1 },
    rotation: -Math.PI / 2,
  },
  {
    type: 'wall',
    pos: { x: 24.9, z: -24.9 },
    size: { width: 49.8, height: 2, depth: 0.1 },
    rotation: -Math.PI / 2,
  },
]

export const roads = [
  {
    pos: { x: 0, z: 25 },
    size: { width: 3, depth: 50 },
    texturePath: 'textures/road.jpg',
    repeat: { x: 1, y: 20 },
    rotation: 0,
  },
  {
    pos: { x: -25, z: 25 },
    size: { width: 3, depth: 50 },
    texturePath: 'textures/road.jpg',
    repeat: { x: 1, y: 20 },
    rotation: 0,
  },
  {
    pos: { x: 22, z: 25 },
    size: { width: 3, depth: 50 },
    texturePath: 'textures/road.jpg',
    repeat: { x: 1, y: 20 },
    rotation: 0,
  },
  {
    pos: { x: -25, z: 1.5 },
    size: { width: 3, depth: 50 },
    texturePath: 'textures/road.jpg',
    repeat: { x: 1, y: 20 },
    rotation: Math.PI / 2,
  },
  {
    pos: { x: -25, z: 25 },
    size: { width: 3, depth: 50 },
    texturePath: 'textures/road.jpg',
    repeat: { x: 1, y: 20 },
    rotation: Math.PI / 2,
  },
  {
    pos: { x: -25, z: -22 },
    size: { width: 3, depth: 50 },
    texturePath: 'textures/road.jpg',
    repeat: { x: 1, y: 20 },
    rotation: Math.PI / 2,
  },
  {
    pos: { x: 0, z: 1.5 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: -25, z: 1.5 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: 22, z: 1.5 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: 0, z: -22 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: -25, z: -22 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: 22, z: -22 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: 0, z: 25 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: -25, z: 25 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
  {
    pos: { x: 22, z: 25 },
    size: { width: 3, depth: 3 },
    texturePath: 'textures/cross.jpg',
    repeat: { x: 10, y: 10 },
    rotation: 0,
  },
]

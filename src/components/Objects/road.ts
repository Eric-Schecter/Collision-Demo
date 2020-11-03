import BaseObject from "./baseObject";
import { RoadData, Pos2D, Size2D, rowNum, colNum } from "../../shared";
import { PlaneGeometry, RepeatWrapping, MeshBasicMaterial, Mesh, TextureLoader } from "three";

export default class Road extends BaseObject {
  private _pos: Pos2D;
  private _size: Size2D;
  private _rotation: number;
  constructor(data: RoadData, layer: number) {
    super();
    const { pos, size: { width, depth }, rotation } = data;
    this._type = 'road';
    this._pos = data.pos;
    this._size = data.size;
    this._rotation = data.rotation;
    this._instance = this.create(data);
    this.setPos(pos, width, depth, rotation, layer);
    this.rotate(width, depth, rotation);
  }
  private create = ({ size: { width, depth }, texturePath, repeat }: RoadData) => {
    const geometry = new PlaneGeometry(width, depth);
    const texture = new TextureLoader().load(texturePath);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeat.x, repeat.y);
    const material = new MeshBasicMaterial({ map: texture });
    return new Mesh(geometry, material);
  }
  private setPos = (pos: Pos2D, width: number, depth: number, rotation: number, layer: number) => {
    const { x, z } = pos;
    rotation === 0
      ? this._instance.position.set(x + width / 2, 0.001 * (layer + 1), z - depth / 2)
      : this._instance.position.set(x + depth / 2, 0.001 * (layer + 1), z - width / 2);
  }
  private rotate = (width: number, depth: number, rotation: number) => {
    this._instance.rotation.x = -Math.PI / 2;
    this._instance.geometry.translate(-width / 2, 0, -depth / 2);
    this._instance.rotation.z = rotation;
    this._instance.geometry.translate(width / 2, 0, depth / 2);
  }
  private clamp = (value: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, value))
  }
  public updateSpace = (mapData: number[][]) => {
    const { x, z } = this._pos;
    const { width, depth } = this._size;
    const resolution = 0.1;
    const xLength = this._rotation === 0 ? width : depth;
    const zLength = this._rotation === 0 ? depth : width;
    for (let i = x; i < x + xLength; i += resolution) {
      for (let j = z; j > z - zLength; j -= resolution) {
        const { rowIndex, colIndex } = this.pos2Index({ x: i * 10, z: j * 10 });
        mapData[this.clamp(rowIndex, 0, rowNum - 1)][this.clamp(colIndex, 0, colNum - 1)] = 0.5;
      }
    }
  }
}
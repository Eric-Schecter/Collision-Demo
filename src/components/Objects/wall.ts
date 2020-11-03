import { Mesh, BoxBufferGeometry, MeshBasicMaterial } from "three";
import { Size, Pos2D} from "../../shared";
import BaseObject from "./baseObject";

export default class Wall extends BaseObject {
  constructor(private _pos: Pos2D, private _size: Size, private _rotation: number) {
    super();
    this._type = 'wall';
    const { width, height, depth } = _size;
    this._instance = this.create(width, height, depth)
    this.setPos(_pos, width, depth, _rotation);
    this.rotate(width, depth, _rotation);
  }
  private create = (width: number, height: number, depth: number) => {
    const geometry = new BoxBufferGeometry(width, height, depth);
    const material = new MeshBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.5 });
    return new Mesh(geometry, material);
  }
  private setPos = (pos: Pos2D, width: number, depth: number, rotation: number) => {
    const { x, z } = pos;
    rotation === 0
      ? this._instance.position.set(x + width / 2, 1, z + depth / 2)
      : this._instance.position.set(x + depth / 2, 1, z + width / 2);
  }
  private rotate = (width: number, depth: number, rotation: number) => {
    this._instance.geometry.translate(-width / 2, 0, -depth / 2);
    this._instance.rotation.y = rotation;
    this._instance.geometry.translate(width / 2, 0, depth / 2);
  }
  public updateSpace = (mapData: number[][]) => {
    const { x, z } = this._pos;
    const { width, depth } = this._size;
    const resolution = 0.1;
    const xLength = this._rotation === 0 ? width : depth;
    const zLength = this._rotation === 0 ? depth : width;
    for (let i = x; i < x + xLength; i += resolution) {
      for (let j = z; j < z + zLength; j += resolution) {
        const { rowIndex, colIndex } = this.pos2Index({ x: i * 10, z: j * 10 });
        mapData[rowIndex][colIndex] = -1;
      }
    }
  }
}
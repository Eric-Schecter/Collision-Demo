import { Mesh, MeshBasicMaterial, Scene, Box3, Vector3, BoxGeometry } from "three";
import { Size, Pos2D } from "../../shared";
import MovingObject from "./movingObject";

export default class Wall {
  private _area = new Box3();
  private _instance: Mesh;
  private normal: Vector3;
  private affectedObjs: Array<MovingObject | Wall> = [];
  protected type = 'wall';
  constructor(pos: Pos2D, size: Size, rotation: number, scene: Scene) {
    const { width, height, depth } = size;
    const mesh = this.create(width, height, depth);
    this.setPos(mesh, pos, width, depth, rotation);
    this.rotate(mesh, width, depth, rotation);
    this.area.setFromObject(mesh);
    this.normal = rotation === 0 ? new Vector3(0, 0, -1) : new Vector3(1, 0, 0);
    this._instance = mesh;
    scene.add(this._instance);
  }
  private create = (width: number, height: number, depth: number) => {
    const geometry = new BoxGeometry(width, height, depth);
    const material = new MeshBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.5 });
    return new Mesh(geometry, material);
  }
  private setPos = (mesh: Mesh, pos: Pos2D, width: number, depth: number, rotation: number) => {
    const { x, z } = pos;
    rotation === 0
      ? mesh.position.set(x + width / 2, 1, z + depth / 2)
      : mesh.position.set(x + depth / 2, 1, z + width / 2);
  }
  private rotate = (mesh: Mesh, width: number, depth: number, rotation: number) => {
    mesh.geometry.translate(-width / 2, 0, -depth / 2);
    mesh.rotation.y = rotation;
    mesh.geometry.translate(width / 2, 0, depth / 2);
  }
  public get pos() {
    return this._instance.position;
  }
  public get instance() {
    return this._instance
  }
  public get area() {
    return this._area;
  }
  public get nv() {
    return this.normal;
  }
  public set setAffectedObjs(res: MovingObject | Wall) {
    this.affectedObjs.push(res);
  }
}
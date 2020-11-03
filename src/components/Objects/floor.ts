import BaseObject from "./baseObject";
import { RepeatWrapping, Mesh, TextureLoader, PlaneBufferGeometry, MeshPhongMaterial } from "three";

export default class Floor extends BaseObject {
  constructor() {
    super();
    this._instance = this.create();
  }
  private create = () => {
    const geometry = new PlaneBufferGeometry(50, 50);
    const texture = new TextureLoader().load('textures/floor.jpg');
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(50, 50);
    const material = new MeshPhongMaterial({ map: texture, depthWrite: false });
    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = - Math.PI / 2;
    return mesh
  }
  public updateSpace = (mapData: number[][]) => {}
}
import Terrain from "./terrain";
import { RepeatWrapping, Mesh, TextureLoader, PlaneBufferGeometry, MeshPhongMaterial, Scene } from "three";
import { mapParams } from "../../shared";
const { width, height } = mapParams;

export default class Floor extends Terrain {
  constructor(scene: Scene) {
    super();
    scene.add(this.create());
  }
  private create = () => {
    const geometry = new PlaneBufferGeometry(width, height);
    const texture = new TextureLoader().load('./textures/floor.jpg');
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(50, 50);
    const material = new MeshPhongMaterial({ map: texture, depthWrite: false });
    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = - Math.PI / 2;
    return mesh
  }
  public updateSpace = (mapData: number[][]) => { }
}
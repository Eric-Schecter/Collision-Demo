import { Directions } from "../../shared";
import MovingObject from "./movingObject";
import QuadTree from "./quadTree";
import { Vector3 } from "three";
const { east, west, north, south } = Directions;

export default class Player extends MovingObject {
  protected type = 'player';
  private handleDirection = (a:Vector3,dir: Directions) => {
    const engineForce = 0.01;
    switch (dir) {
      case east: { a.x += engineForce; a.z -= engineForce; break; }
      case west: { a.x -= engineForce; a.z += engineForce; break; }
      case north: { a.x -= engineForce; a.z -= engineForce; break; }
      case south: { a.x += engineForce; a.z += engineForce; break; }
    }
  }
  protected updateA = (dir: Directions[], ratio: number) => {
    const maxForce = 0.01;
    const [dirOne, dirTwo] = dir;
    const a = new Vector3();
    this.handleDirection(a,dirOne);
    this.handleDirection(a,dirTwo);
    a.clampLength(0, maxForce)
      .multiplyScalar(1 / ratio);
    this.a.add(a);
  }
  private getRadian = (dir: Directions) => {
    switch (dir) {
      case east: { return Math.PI * 7 / 4; }
      case west: { return Math.PI * 3 / 4; }
      case north: { return Math.PI / 4; }
      case south: { return Math.PI * 5 / 4; }
    }
  }
  protected updateRadian = (dir: Directions[]) => {
    const rotationSum = dir.reduce((pre, curr) => pre + this.getRadian(curr), 0);
    const rotationException = dir.includes(north) && dir.includes(east) ? 0 : rotationSum;
    const targetRotation = dir.length
      ? rotationException / dir.length
      : this._instance.rotation.y;
    const rv = 0.1;
    const rotation = targetRotation - this._instance.rotation.y;
    const rotationFinal = Math.abs(rotation) > Math.PI ? rotation - Math.PI * 2 : rotation;
    this._instance.rotation.y += rotationFinal * rv;
  }
  public update = (dir: Directions[], mapData: number[][], quadTree: QuadTree) => {
    this.updateCollisionArea();
    this.checkCollision(quadTree);
    const mapRatio = this.getRatio(mapData);
    this.updateA(dir, mapRatio);
    this.updateV();
    this.updateRadian(dir.slice(0, 2));
    this.updateP();
  }
}
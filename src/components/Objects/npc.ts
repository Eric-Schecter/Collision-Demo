import { Vector3 } from "three";
import MovingObject from "./movingObject";
import QuadTree from "./quadTree";

export default class NPC extends MovingObject {
  protected targetPos = new Vector3(0, 0, 0);
  protected type = 'npc';

  protected updateA = (ratio: number, target: Vector3) => {
    const maxForce = 0.01;
    const { x, z } = this._instance.position;
    const dir = new Vector3(0, 0, 0).subVectors(new Vector3(x, 0, z), target);
    const a = new Vector3()
      .sub(dir)
      .clampLength(0, maxForce)
      .multiplyScalar(1 / ratio);
    const distance = dir.length();
    const decelerationZone = 2;
    if (distance < decelerationZone) {
      a.multiplyScalar(distance / decelerationZone)
    }
    this.a.add(a);
  }
  protected updateRadian = () => {
    const originDir = new Vector3(0, 0, -1);
    const currDir = new Vector3().copy(this.a).normalize();
    const angle = currDir.angleTo(originDir);
    if (angle < 0.01) { return }
    const cross = currDir.cross(originDir);
    const dir = new Vector3(0, 1, 0).dot(cross);
    const targetRotation = dir > 0 ? -angle : angle;
    const rv = 0.1;
    const rotation = targetRotation - this._instance.rotation.y;
    const rotationFinal = Math.abs(rotation) > Math.PI ? rotation - Math.PI * 2 : rotation;
    this._instance.rotation.y += rotationFinal * rv;
  }
  public update = (mapData: number[][], quadTree: QuadTree) => {
    const target = new Vector3(0, 0, 0);
    this.updateCollisionArea();
    this.checkCollision(quadTree);
    const mapRatio = this.getRatio(mapData);
    this.updateA(mapRatio, target);
    this.updateV();
    this.updateRadian();
    this.updateP();
  }
}
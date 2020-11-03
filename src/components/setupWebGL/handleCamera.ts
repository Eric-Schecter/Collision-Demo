import { PerspectiveCamera } from "three";
import { Pos3D } from "../../shared";

export const handleCamera = (width: number, height: number, pos: Pos3D) => {
  const { x, y, z } = pos;
  const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(x, y, z);
  return camera;
}
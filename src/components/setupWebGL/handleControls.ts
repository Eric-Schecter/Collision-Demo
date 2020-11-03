import { Camera, Renderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const handleControls = (camera: Camera, renderer: Renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.1, 0);
  controls.update();
  controls.minDistance = 0.5;
  controls.maxDistance = 50;
  controls.maxPolarAngle = 0.5 * Math.PI;
}
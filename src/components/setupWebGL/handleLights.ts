import { Scene, DirectionalLight, HemisphereLight } from "three";

const createHemiLight = (scene: Scene) => {
  const hemiLight = new HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);
}

const createDirLight = (scene: Scene) => {
  const dirLight = new DirectionalLight(0xffffff);
  dirLight.position.set(5, 5, 0);
  dirLight.shadow.camera.top = 1;
  dirLight.shadow.camera.bottom = - 1;
  dirLight.shadow.camera.left = - 1;
  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);
}

export const handleLights = (scene: Scene) => {
  createHemiLight(scene);
  createDirLight(scene);
}
import { PerspectiveCamera, Renderer } from "three";

export const handleResize = (camera: PerspectiveCamera, renderer: Renderer) => {
  const resize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', resize);
}
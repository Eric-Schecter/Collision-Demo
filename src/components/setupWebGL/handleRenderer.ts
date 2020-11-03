import { WebGLRenderer, sRGBEncoding } from "three";

export const handleRenderer = (target: HTMLDivElement, width: number, height: number) => {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 1);
  renderer.outputEncoding = sRGBEncoding;
  target.appendChild(renderer.domElement);
  return renderer;
}
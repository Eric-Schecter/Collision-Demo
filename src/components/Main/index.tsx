import React, { useEffect, useRef } from "react";
import styles from './styles.module.scss';
import { Scene, Raycaster, Intersection, PerspectiveCamera } from 'three';
import { System } from "../Objects";
import {
  handleResize, handleLights, handleRenderer
} from "../setupWebGL";
import { Directions } from "../../shared";
const { north, east, south, west } = Directions;
const directions = [north, east, south, west];

export default function Main() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const refKeypress = useRef<Directions[]>([]);

  useEffect(() => {
    if (!ref.current) { return }
    const { offsetWidth, offsetHeight } = ref.current;
    const scene = new Scene();
    const system = new System(scene);
    // scene.fog = new Fog( 0xa0a0a0, 2, 40 );
    const camera = new PerspectiveCamera(45, offsetWidth / offsetHeight, 0.1, 1000);
    const renderer = handleRenderer(ref.current, offsetWidth, offsetHeight);
    handleLights(scene);
    // handleControls(camera, renderer);
    // handleFloor(scene);
    handleResize(camera, renderer);
    const raycaster = new Raycaster();

    let timer = 0;
    const animate = () => {
      renderer.render(scene, camera);
      raycaster.setFromCamera(mouseRef.current, camera);
      const target = system.robot.instance.position;
      const { x, y, z } = target
      camera.position.set(x + 3, y + 2, z + 3);
      camera.lookAt(target);

      const commands = refKeypress.current.slice().sort((a, b) => b - a);
      system.update(commands);

      timer = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(timer);
  }, [ref])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const indexDir = directions.indexOf(e.keyCode);
      const index = refKeypress.current.indexOf(e.keyCode);
      if (indexDir === -1 || index !== -1) { return }
      refKeypress.current.push(e.keyCode);
    };
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down, false);
  }, [])

  useEffect(() => {
    const up = (e: KeyboardEvent) => {
      const index = refKeypress.current.indexOf(e.keyCode);
      if (index === -1) { return }
      refKeypress.current.splice(index, 1);
    }
    window.addEventListener('keyup', up);
    return () => window.removeEventListener('keyup', up, false);
  }, [])

  return (
    <div
      ref={ref}
      className={styles.root}
    // onClick={click}
    // onMouseMove={move}
    />
  );
}
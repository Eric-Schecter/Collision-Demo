import React, { useEffect, useRef, useState } from "react";
import styles from './styles.module.scss';
import { Scene, PerspectiveCamera } from 'three';
import { System } from "./Objects";
import { handleResize, handleLights, handleRenderer, handleStats } from "./setupWebGL";
import { Directions } from "./../shared";

const { north, east, south, west } = Directions;
const directions = [north, east, south, west];

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const refKeypress = useRef<Directions[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) { return }
    const { offsetWidth, offsetHeight } = ref.current;
    const scene = new Scene();
    const system = new System(scene);
    const camera = new PerspectiveCamera(45, offsetWidth / offsetHeight, 0.1, 1000);
    const renderer = handleRenderer(ref.current, offsetWidth, offsetHeight);
    handleLights(scene);
    handleResize(camera, renderer);
    const stats = handleStats(ref.current);

    let timer = 0;
    let mark = false;
    const animate = () => {
      stats.begin();
      renderer.render(scene, camera);
      const target = system.target;
      if (target) {
        if (!mark) {
          mark = true;
          setTimeout(() => {
            setIsLoaded(true);
          }, 100);
        }
        const { x, y, z } = target
        camera.position.set(x + 3, y + 2, z + 3);
        camera.lookAt(target);
      }

      const commands = refKeypress.current.slice().sort((a, b) => b - a);
      system.update(commands);
      stats.end();
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
    <>
      {!isLoaded && <div className={styles.loading} />}
      <div
        ref={ref}
        className={styles.root}
      />
    </>
  );
}
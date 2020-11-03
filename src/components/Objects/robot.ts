import { Group, Scene, Vector3, TextureLoader, PlaneBufferGeometry, MeshBasicMaterial, Mesh } from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Pos2D, Directions, rowNum, colNum } from "../../shared";
const { east, west, north, south } = Directions;

const modelPath = 'models/Boombox.glb';
const shadowPath = 'textures/roundshadow.png';
export default class Robot {
  private _instance: Group;
  private targetPos: Vector3;
  private v: Vector3;
  private a: Vector3;
  constructor(_pos: Pos2D, scene: Scene) {
    const { x, z } = _pos;
    this._instance = new Group();
    this._instance.position.set(x + 0.5, 0.2, z + 0.5);
    this.targetPos = new Vector3(x + 0.5, 0.2, z + 0.5);
    this.v = new Vector3(0, 0, 0);
    this.a = new Vector3(0, 0, 0);
    const loadModel = (gltf: GLTF) => {
      const scale = 20;
      const model = this.createModel(gltf, x, z, scale)
      const shadow = this.createShadow(scale);
      model.add(shadow);
      this._instance = model;
      scene.add(this._instance);
    }
    new GLTFLoader().load(modelPath, loadModel);
  }
  private createModel = (gltf: GLTF, x: number, z: number, scale: number) => {
    const model = gltf.scene;
    model.position.set(x + 0.5, 0.2, z + 0.5);
    model.scale.set(scale, scale, scale);
    model.children.forEach(child => child.castShadow = true);
    return model;
  }
  private createShadow = (scale: number) => {
    const planeSize = 1;
    const shadowGeo = new PlaneBufferGeometry(planeSize, planeSize);
    const shadowTexture = new TextureLoader().load(shadowPath);
    const shadowMat = new MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const size = scale * 0.001;
    const shadowMesh = new Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -size / 2 + 0.001;
    shadowMesh.rotation.x = Math.PI * -.5;
    shadowMesh.scale.set(size * 1.5, size * 1.5, size * 1.5);
    return shadowMesh;
  }
  private handleDirection = (dir: Directions) => {
    const engineForce = 0.01;
    switch (dir) {
      case east: { this.a.x += engineForce; this.a.z -= engineForce; break; }
      case west: { this.a.x -= engineForce; this.a.z += engineForce; break; }
      case north: { this.a.x -= engineForce; this.a.z -= engineForce; break; }
      case south: { this.a.x += engineForce; this.a.z += engineForce; break; }
    }
  }
  private updateA = (dir: Directions[], ratio: number) => {
    const maxForce = 0.01;
    const [dirOne, dirTwo] = dir;
    this.a.multiplyScalar(0);
    this.handleDirection(dirOne);
    this.handleDirection(dirTwo);
    this.a.clampLength(0, maxForce).multiplyScalar(1 / ratio);
  }
  private pos2Index = (pos: Pos2D) => {
    const { x, z } = pos;
    return {
      xIndex: Math.floor(z * 10 + rowNum / 2),
      yIndex: Math.floor(x * 10 + colNum / 2),
    }
  }
  private clamp = (value: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, value))
  }
  private checkCollision = (mapData: number[][]) => {
    const p = this._instance.position;
    const size = 2;
    const { xIndex, yIndex } = this.pos2Index(p);
    const rowLow = this.clamp(xIndex - size, 0, rowNum - 1);
    const rowHigh = this.clamp(xIndex + size, 0, rowNum - 1);
    const colLow = this.clamp(yIndex - size, 0, colNum - 1);
    const colHigh = this.clamp(yIndex + size, 0, colNum - 1);
    for (let i = rowLow; i <= rowHigh; i++) {
      for (let j = colLow; j <= colHigh; j++) {
        if (mapData[i][j] === -1) {
          return true;
        }
      }
    }
    return false;
  }
  private updateV = (isColliding: boolean) => {
    const resistance = 0.9;
    this.v.add(this.a)
      .multiplyScalar(resistance);
    if (isColliding) {
      this.v.multiplyScalar(-1);
    }
  }
  private updateP = () => {
    this._instance.position.add(this.v);
  }
  private getRadian = (dir: Directions) => {
    switch (dir) {
      case east: { return Math.PI * 7 / 4; }
      case west: { return Math.PI * 3 / 4; }
      case north: { return Math.PI / 4; }
      case south: { return Math.PI * 5 / 4; }
    }
  }
  private updateRadian = (dir: Directions[]) => {
    const rotationSum = dir.reduce((pre, curr) => pre + this.getRadian(curr), 0);
    const rotationException = dir.includes(north) && dir.includes(east) ? 0 : rotationSum;
    const targetRotation = dir.length
      ? rotationException / dir.length
      : this._instance.rotation.y;
    const rv = 0.5;
    const rotation = targetRotation - this._instance.rotation.y;
    const rotationFinal = Math.abs(rotation) > Math.PI ? rotation - Math.PI * 2 : rotation;
    this._instance.rotation.y += rotationFinal * rv;
  }
  public update = (dir: Directions[], mapData: number[][]) => {
    const { x, z } = this._instance.position;
    const { xIndex, yIndex } = this.pos2Index({ x, z });
    const mapRatio = mapData[xIndex][yIndex];
    this.updateA(dir, mapRatio);
    const isColliding = this.checkCollision(mapData);
    this.updateV(isColliding);
    this.updateRadian(dir.slice(0, 2));
    this.updateP();
  }
  public get instance() {
    return this._instance;
  }
}
import { Scene, Group, Vector3, PlaneBufferGeometry, MeshBasicMaterial, Mesh, Box3, BoxHelper, Texture } from "three";
import { Pos2D, rowNum, colNum, mapParams } from "../../shared";
import Wall from "./wall";
import QuadTree from "./quadTree";
const { width, height } = mapParams;

export default abstract class MovingObject {
  protected _instance: Group;
  protected _v: Vector3;
  protected _a: Vector3;
  protected helper: BoxHelper | null = null;
  protected _area: Box3;
  protected affectedObjs: Array<MovingObject | Wall> = [];
  protected type = 'default';
  protected _weight = 1;
  constructor(private pos: Pos2D, scene: Scene, model: Group, shadowTexture: Texture) {
    const { x, z } = pos;
    this._instance = new Group();
    this._instance.position.set(x + 0.5, 0.2, z + 0.5);
    this._v = new Vector3(0, 0, 0);
    this._a = new Vector3(0, 0, 0);
    this._area = new Box3();
    this.init(scene, model, shadowTexture);
  }
  private init = (scene: Scene, model: Group, shadowTexture: Texture) => {
    const scale = 20;
    const robot = this.createModel(model, scale)
    const shadow = this.createShadow(scale, shadowTexture);
    robot.add(shadow);
    this._instance = robot;
    scene.add(this._instance);
    this.updateCollisionArea();
  }
  protected createModel = (model: Group, scale: number) => {
    const { x, z } = this.pos;
    model.position.set(x + 0.5, 0.2, z + 0.5);
    model.scale.set(scale, scale, scale);
    return model;
  }
  protected createShadow = (scale: number, shadowTexture: Texture) => {
    const planeSize = 1;
    shadowTexture.needsUpdate = true;
    const shadowGeo = new PlaneBufferGeometry(planeSize, planeSize);
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
  protected abstract updateA = (...args: any) => { }
  private pos2Index = (pos: Pos2D) => {
    const { x, z } = pos;
    return {
      rowIndex: Math.floor(z * 10 + rowNum / 2),
      colIndex: Math.floor(x * 10 + colNum / 2),
    }
  }
  private clamp = (value: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, value))
  }
  protected updateV = () => {
    const resistance = 0.9;
    this.v.add(this.a)
      .multiplyScalar(resistance);
  }
  protected updateP = () => {
    this._instance.position.add(this.v);
    const { x, y, z } = this._instance.position;
    const padding = 0.5;
    const clampedWidth = width - padding;
    const clampedHeight = height - padding;
    this._instance.position.set(
      this.clamp(x, -clampedHeight / 2, clampedHeight / 2),
      y,
      this.clamp(z, -clampedWidth / 2, clampedWidth / 2))
  }
  protected abstract updateRadian = (...args: any) => { }
  protected getRatio = (mapData: number[][]) => {
    const { x, z } = this._instance.position;
    const { rowIndex, colIndex } = this.pos2Index({ x, z });
    return mapData[this.clamp(rowIndex, 0, rowNum - 1)][this.clamp(colIndex, 0, rowNum - 1)];
  }
  private markAffectedObj = (obj: MovingObject | Wall) => {
    obj.setAffectedObjs = this;
    this.setAffectedObjs = obj;
  }
  private checkCollisionForWall = (obj: Wall) => {
    const vec = new Vector3().copy(this.position).projectOnPlane(obj.nv).sub(this.position)
    const angle = Math.abs(Math.atan2(this.v.x, this.v.z) - Math.atan2(vec.x, vec.z));
    if (angle < Math.PI / 2) { return }
    const responseForce = 1.5;
    const v = new Vector3()
      .copy(this.v)
      .projectOnVector(obj.nv)
      .multiplyScalar(responseForce);
    this.v.sub(v);
    this.markAffectedObj(obj);
  }
  protected antiForce = (r: number, v1: Vector3, v2: Vector3) => {
    const ratio = 0.1;
    return {
      a1: v1.multiplyScalar(-ratio / r),
      a2: v2.multiplyScalar(-ratio / r),
    }
  }
  private checkCollisionForMovingObjs = (obj: MovingObject) => {
    const vec = new Vector3().copy(obj.position).sub(this.position).normalize();
    const v1dir = new Vector3().copy(vec);
    const v2dir = new Vector3().copy(vec).multiplyScalar(-1);
    const { a1, a2 } = this.antiForce(vec.length(), v1dir,v2dir);
    this.a.add(a1)
    obj.a.add(a2);
    this.markAffectedObj(obj);
  }
  protected checkCollision = (quadTree: QuadTree) => {
    const filteredObjs = quadTree.retrieve(this);
    for (let i = 0; i < filteredObjs.length; i++) {
      if (this.affectedObjs.includes(filteredObjs[i])) { continue }
      if (filteredObjs[i].area.intersectsBox(this._area)) {
        if (filteredObjs[i] instanceof Wall) {
          this.checkCollisionForWall(filteredObjs[i] as Wall);
        } else {
          this.checkCollisionForMovingObjs(filteredObjs[i] as MovingObject);
        }
      }
    }
  }
  protected updateCollisionArea = () => {
    const obj = this._instance.children[0];
    obj && this.area.setFromObject(obj);
  }
  public initParams = () => {
    this.a.multiplyScalar(0);
    this.affectedObjs = [];
  }
  public get area() {
    return this._area;
  }
  public get instance() {
    return this._instance
  }
  public get position() {
    return this._instance.position;
  }
  public get weight() {
    return this._weight;
  }
  public get v() {
    return this._v;
  }
  public set setV(v: Vector3) {
    this._v = v;
  }
  public get a() {
    return this._a;
  }
  public set setAffectedObjs(res: MovingObject | Wall) {
    this.affectedObjs.push(res);
  }
}
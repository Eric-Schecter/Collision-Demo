import { Scene, TextureLoader, Texture } from 'three';
import { Directions, rowNum, colNum, data, roads, mapParams, Pos2D } from '../../shared';
import Player from './player';
import NPC from './npc';
import Wall from './wall';
import Road from './road';
import Floor from './floor';
import MovingObject from './movingObject';
import QuadTree from './quadTree';
import Rect from './rect';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
const { x, z, width, height } = mapParams;

export class System {
  private npcNum = 200;
  private _npcs: Array<NPC> = [];
  private _player: Player | null = null;
  private map = new Array(rowNum).fill(0).map(() => new Array(colNum).fill(1));
  private movingObjs: Array<MovingObject> = [];
  private quadTree: QuadTree;
  private npcData: Array<Pos2D>;
  private modelPath = 'models/Boombox.glb';
  private shadowPath = 'textures/roundshadow.png';
  constructor(scene: Scene) {
    const gene = () => Math.random() * 40 - 20;
    this.npcData = new Array(this.npcNum).fill(0).map(() => ({ x: gene(), z: gene() }));
    this.initTerrain(scene);
    const staticObjs = data.map(({ pos, size, rotation }) => new Wall(pos, size, rotation, scene));
    this.quadTree = new QuadTree(new Rect(x - 5, z - 5, width + 10, height + 10));
    staticObjs.forEach(obj => this.quadTree.insert(obj));
    this.initMovingObjs(scene);
  }
  private initMovingObjs = async (scene: Scene) => {
    const gltf: GLTF = await new GLTFLoader().loadAsync(this.modelPath);
    const shadowTexture: Texture = await new TextureLoader().loadAsync(this.shadowPath);
    const npcs = this.npcData.map(npc => new NPC(npc, scene, gltf.scene.clone(), shadowTexture.clone()));
    npcs.forEach(npc => this._npcs.push(npc));
    this._player = new Player({ x: 5, z: 5 }, scene, gltf.scene.clone(), shadowTexture.clone());
    this.movingObjs = [...this._npcs, this._player];
    this.movingObjs.forEach(obj => this.quadTree.insert(obj));
  }
  private initTerrain = (scene: Scene) => {
    const objects = roads.map((road, layer) => new Road(road, layer, scene));
    const floor = new Floor(scene);
    [floor, ...objects].forEach(obj => obj.updateSpace(this.map));
  }
  public update = (dir: Directions[]) => {
    this.quadTree.refresh();
    this.movingObjs.forEach(obj => obj.initParams());
    this._player?.update(dir, this.map, this.quadTree);
    this._npcs.forEach(npc => npc.update(this.map, this.quadTree));
  }
  public get target() {
    return this._player?.position;
  }
}

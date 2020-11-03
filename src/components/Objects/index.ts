import { Scene } from 'three';
import { Directions, rowNum, colNum, data, roads } from '../../shared';
import BaseObject from './baseObject';
import Robot from './robot';
import NPC from './npc';
import Wall from './wall';
import Road from './road';
import Floor from './floor';

export class System {
  private _data: Array<BaseObject> = [];
  private _robot: Robot;
  private map = new Array(rowNum).fill(0).map(() => new Array(colNum).fill(1));
  constructor(scene: Scene) {
    this._robot = new Robot({ x: 3, z: 3 }, scene);
    new NPC({ x: 2, z: 0 }, scene);
    const objects = data.map(({ pos, size, rotation }) => new Wall(pos, size, rotation))
    const objects2 = roads.map((road, layer) => new Road(road, layer));
    const floor = new Floor();
    this._data = [floor, ...objects2, ...objects];
    this._data.forEach(obj => scene.add(obj.instance));
    this._data.forEach(obj => obj.updateSpace(this.map));
  }
  public update = (dir: Directions[]) => {
    this._robot.update(dir, this.map);
  }
  public get robot() {
    return this._robot;
  }
}

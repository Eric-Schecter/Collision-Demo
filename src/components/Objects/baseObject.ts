import { Pos2D, ObjectType, rowNum, colNum } from "../../shared";

export default abstract class BaseObject {
  protected _instance: any;
  protected _type: ObjectType = 'default';
  protected pos2Index = (pos: Pos2D) => {
    const { x, z } = pos;
    return {
      rowIndex: Math.floor(z + rowNum / 2),
      colIndex: Math.floor(x + colNum / 2),
    }
  }
  public abstract updateSpace = (mapData: number[][]) => { }
  public get instance() {
    return this._instance;
  }
}
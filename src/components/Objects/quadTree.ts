import Rect from "./rect"
import MovingObject from "./movingObject";
import Wall from "./wall";

export default class QuadTree {
  private objects: Array<MovingObject | Wall>;
  private nodes: QuadTree[];
  constructor(private bounds: Rect, private checkArea = 10, private level = 0, private maxObjs = 5, private maxLevel = 5) {
    this.objects = [];
    this.nodes = [];
  }
  public insert = (object: MovingObject | Wall) => {
    if (this.nodes.length) {
      this.getIndex(object).forEach(index => this.nodes[index].insert(object));
      return;
    }
    this.objects.push(object);
    if (this.objects.length > this.maxObjs && this.level < this.maxLevel) {
      if (!this.nodes.length) {
        this.split();
      }
      this.objects.forEach(obj => this.getIndex(obj).forEach(index => this.nodes[index].insert(obj)))
      this.objects = [];
    }
  }
  public split = () => {
    const level = this.level + 1;
    const { x, y, width, height } = this.bounds;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    this.nodes = [
      new QuadTree(new Rect(x + halfWidth, y, halfWidth, halfHeight), this.checkArea, level, this.maxObjs, this.maxLevel),
      new QuadTree(new Rect(x, y, halfWidth, halfHeight), this.checkArea, level, this.maxObjs, this.maxLevel),
      new QuadTree(new Rect(x, y + halfHeight, halfWidth, halfHeight), this.checkArea, level, this.maxObjs, this.maxLevel),
      new QuadTree(new Rect(x + halfWidth, y + halfHeight, halfWidth, halfHeight), this.checkArea, level, this.maxObjs, this.maxLevel),
    ]
  }
  public getIndex = (object: MovingObject | Wall) => {
    const indexes = [];
    const { x, y, width, height } = this.bounds;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const { area: { min, max } } = object;
    const isNorth = min.x < y + halfHeight;
    const isSouth = max.x > y + halfHeight;
    const isWest = max.z > x + halfWidth;
    const isEast = min.z < x + halfWidth;
    if (isNorth && isEast) { indexes.push(0); }
    if (isNorth && isWest) { indexes.push(1); }
    if (isSouth && isWest) { indexes.push(2); }
    if (isSouth && isEast) { indexes.push(3); }
    return indexes;
  }
  public retrieve = (object: MovingObject | Wall): Array<MovingObject | Wall> => {
    const indexes = this.getIndex(object);
    const objs = this.nodes.length
      ? indexes.flatMap(index => this.nodes[index].retrieve(object))
      : this.objects;
    return objs.filter((obj, index) => objs.indexOf(obj) === index)
      .filter(obj => obj !== object)
    .filter(obj => obj.instance.position.distanceToSquared(object.instance.position) < this.checkArea)
  }
  private isInside = (object: MovingObject | Wall) => {
    const { x, y, width, height } = this.bounds;
    const { area: { min, max } } = object;
    return max.x >= y && min.x <= y + height && max.z >= x && min.z <= x + width;
  }
  public refresh = (root: QuadTree = this) => {
    this.objects = this.objects.filter((obj, index) => this.objects.indexOf(obj) === index);
    for (let i = this.objects.length - 1; i >= 0; i--) {
      if (!this.isInside(this.objects[i])) {
        const obj = this.objects.splice(i, 1)[0];
        root.insert(obj);
      }
      else if (this.nodes.length) {
        const indexes = this.getIndex(this.objects[i]);
        const obj = this.objects.splice(i, 1)[0];
        indexes.forEach(index => this.nodes[index].insert(obj))
      }
    }
    this.nodes.forEach(node => node.refresh(root));
  }
}
import Sprite from "./sprite.js";

export default class Tile extends Sprite {
  constructor (img, left, top, size) {
    super(img, left, top, size, size);
    this.size = size || 16;
    this.mapX = this.mapY = 0; // coordinate on the tilemap
    this.isSynchronize = true;
  }
}
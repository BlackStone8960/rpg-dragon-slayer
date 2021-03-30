import Sprite from "./sprite.js";

export default class Tile extends Sprite {
  constructor (img, left, top, size) {
    super(img, left, top, size, size);
    this.size = size || 16;
    this.mapX = this.mapY = 0; // coordinate on the tilemap
    this.isSynchronize = true;
  }

  isOverLapped(tile) {
    if(tile instanceof Tile) {
      const _isOverLapped = (this.mapX === tile.mapX && this.mapY === tile.mapY) && (this.mapX !== 0 && this.mapY !== 0);
      return _isOverLapped;
    }
    else console.error('The argument is not Tile');
  }
}
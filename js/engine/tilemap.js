import { squareSize } from "./game.js"; 
import Tile from "./tile.js";

export default class Tilemap {
  constructor(img, size, left, top) {
    this.img = new Image();
    this.img.src = img;
    this.x = this.y = 0; //offset position
    this.vx = this.vy = 0; // moving speed
    this.size = size || 16;
    this.data = [];
    this.left = left || false;
    this.top = top || false;
    this.tiles = [];

    // you can designate the tile where user can't pass through
    this.obstacles = [363, 365, 366, 368, 369, 371];
  }

  add(tile) {
    if(tile instanceof Tile) {
      // get the coordinate on Tilemap
      this.mapX = tile.x / squareSize;
      this.mapY = tile.y / squareSize;
      if(!tile.isSynchronize) {
        this.mapX = (tile.x - this.x) / squareSize;
        this.mapY = (tile.y - this.y) / squareSize;  
      }
      this.tiles.push(tile);
    } 
    else console.error('You can only add Tile to Tilemap!');
  }

  hasObstacle(mapX, mapY) {
    const _isObstacleTile = this.obstacles.some((obstacle) => obstacle === this.data[mapY][mapX]);
    return _isObstacleTile;
  }

  update(canvas) {
    this.render(canvas);
    this.onEnterFrame();
    // move tilemap
    this.x += this.vx;
    this.y += this.vy;

    for (let i = 0; i < this.tiles.length; i++) {
      // shift synchronized tile (other than heroes)
      if (this.tiles[i].isSynchronize) {
        this.tiles[i].shiftX = this.x;
        this.tiles[i].shiftY = this.y;  
      }
      this.tiles[i].update(canvas);

      // get the coordinate on Tilemap after updating entire canvas
      this.tiles[i].mapX = this.tiles[i].x / squareSize;
      this.tiles[i].mapY = this.tiles[i].y / squareSize;

      if (!this.tiles[i].isSynchronize) {
        this.tiles[i].mapX = (this.tiles[i].x - this.x) / squareSize;
        this.tiles[i].mapY = (this.tiles[i].y - this.y) / squareSize;
      }
    }
  }

  render(canvas) {
    for (let y = 0; y < this.data.length; y++) {
      const _tileY = squareSize * y + this.y;
      if (_tileY < -1 * this.size || _tileY > canvas.height) continue;

      for (let x = 0; x < this.data[y].length; x++) {
        const _tileX = squareSize * x + this.x;
        if(_tileX < -1 * this.size || _tileX > canvas.width) continue;

        const _frameX = this.data[y][x] % (this.img.width / this.size);
        const _frameY = ~~(this.data[y][x] / (this.img.width / this.size));

        const _ctx = canvas.getContext('2d');
        _ctx.drawImage(
          this.img,
          this.left ? this.left : this.size * _frameX,
          this.top ? this.top : this.size * _frameY,
          this.size,
          this.size,
          _tileX,
          _tileY,
          squareSize,
          squareSize
        )
      }
    }
  }

  onEnterFrame () {}
}
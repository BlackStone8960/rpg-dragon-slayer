import { squareSize } from "./game.js"; 

export default class Tilemap {
  constructor(img, size, left, top) {
    this.img = new Image();
    this.img.src = img;
    this.x = this.y = 0; //offset position
    this.size = size || 16;
    this.data = [];
    this.left = left || false;
    this.top = top || false;
    this.tiles = [];
  }

  update(canvas) {
    this.render(canvas);
    this.onEnterFrame();
  }

  render(canvas) {
    for (let y = 0; y < this.data.length; y++) {
      const _tileY = squareSize * y + this.y;
      if(_tileY < -1 * this.size || _tileY > canvas.height) continue;

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
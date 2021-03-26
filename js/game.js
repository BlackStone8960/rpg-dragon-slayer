const squareSize = 32;
const squareNumberX = 21; // Needs to be odd
const squareNumberY = 15; // Needs to be odd
const canvasWidth = squareSize * squareNumberX;
const canvasHeight = squareSize * squareNumberY;
const centerX = squareNumberX % 2 === 1 ? (canvasWidth - squareSize) / 2 : canvasWidth / 2;
const centerY = squareNumberY % 2 === 1 ? (canvasHeight - squareSize) / 2 : canvasHeight / 2;

class Game {
  constructor (width, height) {
    this.width = width || canvasWidth;
    this.height = height || canvasHeight;
    this.canvas = document.getElementById('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    this.objs = []; 
    this.frame = 0; // frame of this game
  }

  add(sprite, x, y) {
    if(typeof x === "undefined") sprite.x = 0;
    else sprite.x = x;
    if(typeof y === "undefined") sprite.y = 0;
    else sprite.y = y;
    this.ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, 
                  sprite.x, sprite.y, squareSize, squareSize);
  }

  addObj(obj, x, y) {
    obj.x = x || 0;
    obj.y = y || 0;
    this.objs.push(obj);
  }

  start() {
    this._main();
  }

  _main() {
    // this.ctx.fillStyle = "#000";
    // this.ctx.fillRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].render(this.ctx, this.frame);
    }
    this.frame++; // increment frame after every rendering

    // requestAnimationFrame(this._main.bind(this)); Add this later
  }
}

export { Game, squareSize, squareNumberX, squareNumberY, canvasWidth, canvasHeight, centerX, centerY};
let canvas, ctx;
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
    canvas = document.getElementById('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    ctx = canvas.getContext('2d');
  }
  add(sprite, x, y) {
    if(typeof x === "undefined") sprite.x = 0;
    else sprite.x = x;
    if(typeof y === "undefined") sprite.y = 0;
    else sprite.y = y;
    ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height,
                  sprite.x, sprite.y, squareSize, squareSize);
  }
}

export { Game, squareSize, squareNumberX, squareNumberY, canvasWidth, canvasHeight, centerX, centerY, ctx };
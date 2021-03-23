// "use strict";

let canvas, ctx;
const canvasWidth = 640;
const canvasHeight = 640;

class Sprite {
  constructor (img, left, top) {
    this.left = left || 0;
    this.top = top || 0;
    this.img = new Image();
    this.img.src = img;
    this.width = 16;
    this.height = 16;
  }
}

class Game {
  constructor (width, height) {
    this.width = width || 640;
    this.height = height || 640;
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
    ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y, sprite.width * 2, sprite.height * 2);
  }
}

const game = new Game(canvasWidth, canvasHeight);
const hero = new Sprite("img/sprite_sheet.png", 0, 0);
const floor1 = new Sprite("img/tile_set.png", 192, 240);
const wall1 = new Sprite("img/tile_set.png", 96, 208);

const main = () => {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  

  game.add(hero, 320, 320);
  requestAnimationFrame(main);
};
addEventListener('load', main);


// "use strict";

let canvas, ctx;
const canvasWidth = 640;
const canvasHeight = 640;
const oneSquare = 32;

const map = [
  [0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
]

class Sprite {
  constructor (img, left, top, width, height) {
    this.left = left || 0;
    this.top = top || 0;
    this.img = new Image();
    this.img.src = img;
    this.width = width || 16;
    this.height = height || 16;
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
    ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y, oneSquare, oneSquare);
  }
}

const game = new Game(canvasWidth, canvasHeight);
const hero = new Sprite("img/sprite_sheet.png", 0, 0);
const floor1 = new Sprite("img/tile_set.png", 192, 240);
const wall1 = new Sprite("img/tile_set.png", 96, 208);

const main = () => {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      switch(map[y][x]) {
        case 0: 
          game.add(floor1, x * oneSquare, y * oneSquare);
          break;
        case 1: 
          game.add(wall1, x * oneSquare, y * oneSquare);
          break;
      }
    }
  }

  game.add(hero, 320, 320);
  requestAnimationFrame(main);
};
addEventListener('load', main);


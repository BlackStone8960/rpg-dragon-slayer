// "use strict";

let canvas, ctx;
const squareSize = 32;
const squareNumberX = 21; // Needs to be odd
const squareNumberY = 21; // Needs to be odd
const canvasWidth = squareSize * squareNumberX;
const canvasHeight = squareSize * squareNumberY;
const centerX = squareNumberX % 2 === 1 ? (canvasWidth - squareSize) / 2 : canvasWidth / 2;
const centerY = squareNumberY % 2 === 1 ? (canvasHeight - squareSize) / 2 : canvasHeight / 2;
const passableSquare = [0]; // passable area 

let map;

// Map of city
const city1 = [
  [0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0],
  [0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,0 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1 ,1],
	[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0]
]

map = city1;

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
    ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y, squareSize, squareSize);
  }
}

// class Map {
//   constructor (map, )
// }

class Input {
  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.enter = false;
    this.space = false;
  }
  inputListener() {
    addEventListener('keydown', (event) => {
      switch(event.key) {
        case "ArrowUp" :
          this.up = true;
          break;
        case "ArrowDown" :
          this.down = true;
          break;
        case "ArrowLeft" :
          this.left = true;
          break;
        case "ArrowRight" :
          this.right = true;
          break;
        case "Enter" :
          this.enter = true;
          break;
        case "Space" :
          this.space = true;
          break;
      }
      event.preventDefault();
    });
    addEventListener('keyup', (event) => {
      switch(event.key) {
        case "ArrowUp" :
          this.up = false;
          break;
        case "ArrowDown" :
          this.down = false;
          break;
        case "ArrowLeft" :
          this.left = false;
          break;
        case "ArrowRight" :
          this.right = false;
          break;
        case "Enter" :
          this.enter = true;
          break;
        case "Space" :
          this.space = true;
          break;
      }
    })
  }
}

const input = new Input();

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

class Hero {
  constructor () {
    this.sprite = new Sprite("img/sprite_sheet.png");
    this.x = centerX;
    this.y = centerY;
    this.speed = 2;
    this.move = 0;
  }
  moveHero() {
    input.inputListener();
    game.add(this.sprite, this.x, this.y);
    if (this.move === 0) {
      if (input.up) { // When user input arrow up
        let x = this.x / squareSize; // x-coordinate of hero
        let y = this.y / squareSize; // y-coordinate of hero
        if (y > 0) {
          if (passableSquare.includes(map[--y][x])) { // if hero can pass through
            this.move = squareSize;
            input.push = 'up';
          }
        } // elseでmapを移動する処理を書く(mapクラスが必要？)
      } else if (input.down) { // When user input arrow down
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (y < squareNumberY - 1) {
          if (passableSquare.includes(map[++y][x])) { 
            this.move = squareSize;
            input.push = 'down';
          }
        }
      } else if (input.left) { // When user input arrow left
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (x > 0) {
          if (passableSquare.includes(map[y][--x])) {
            this.move = squareSize;
            input.push = 'left';
          }
        }
      } else if (input.right) { // When user input arrow right
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (x < squareNumberX - 1) {
          if (passableSquare.includes(map[y][++x])) {
            this.move = squareSize;
            input.push = 'right';
          }
        }
      }
    } else if (this.move > 0) {
      this.move -= this.speed;
      switch (input.push) {
        case 'up' :
          this.y -= this.speed;
          break;
        case 'down' :
          this.y += this.speed;
          break;
        case 'left' :
          this.x -= this.speed;
          break;
        case 'right' :
          this.x += this.speed;
          break;
      }
    }
  }
}

const game = new Game(canvasWidth, canvasHeight);
const floor1 = new Sprite("img/tile_set.png", 192, 240);
const wall1 = new Sprite("img/tile_set.png", 96, 208);

const hero = new Hero();

const main = () => {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Make Map class later
  // Make upper and lower limit change depending on hero's position
  for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      switch(map[y][x]) {
        case 0: 
          game.add(floor1, x * squareSize, y * squareSize);
          break;
        case 1: 
          game.add(wall1, x * squareSize, y * squareSize);
          break;
      }
    }
  }

  hero.moveHero();

  requestAnimationFrame(main);
};
addEventListener('load', main);


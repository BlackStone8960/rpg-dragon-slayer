import Sprite from './sprite.js';
import { map, passableSquare } from './map.js';
import { squareSize, centerX, centerY, squareNumberX, squareNumberY } from "./game.js";

const battleRate = 0.10;

class Hero {
  constructor () {
    this.frontSprite1 = new Sprite("img/sprite_sheet.png");
    this.frontSprite2 = new Sprite("img/sprite_sheet.png", 0, 30);
    this.backSprite1 = new Sprite("img/sprite_sheet.png", 60);
    this.backSprite2 = new Sprite("img/sprite_sheet.png", 60, 30);
    this.leftSprite1 = new Sprite("img/sprite_sheet.png", 30);
    this.leftSprite2 = new Sprite("img/sprite_sheet.png", 30, 30);
    this.rightSprite1 = new Sprite("img/sprite_sheet.png", 90);
    this.rightSprite2 = new Sprite("img/sprite_sheet.png", 90, 30);
    this.x = centerX;
    this.y = centerY;
    this.speed = 2; // need to change
    this.move = 0;
    this.direction = "down";
    this.foot = true;
    this.moved = false; // whether if just after moved
    this.attack = 4;
    this.defence = 6;
  }
  moveHero() {
    const input = window.gameInput;
    const game = window.game;
    input.inputListener();
    switch(this.direction) {
      case "down" :
        this.foot ? game.add(this.frontSprite1, this.x, this.y) : game.add(this.frontSprite2, this.x, this.y);
        break;
      case "up" :
        this.foot ? game.add(this.backSprite1, this.x, this.y) : game.add(this.backSprite2, this.x, this.y);
        break;
      case "left" :
        this.foot ? game.add(this.leftSprite1, this.x, this.y) : game.add(this.leftSprite2, this.x, this.y);
        break;
      case "right" :
        this.foot ? game.add(this.rightSprite1, this.x, this.y) : game.add(this.rightSprite2, this.x, this.y);
        break;
    }
    if (this.move === 0) {
      if (this.moved) {
        // make battle class & method
        if (Math.random() < battleRate) {
          alert('Enemy appeared!');
        }
        this.moved = false;
      }
      if (input.up) { // When user input arrow up
        let x = this.x / squareSize; // x-coordinate of hero
        let y = this.y / squareSize; // y-coordinate of hero
        if (y > 0) {
          if (passableSquare.includes(map[--y][x])) { // if hero can pass through
            this.move = squareSize;
            input.push = 'up';
            this.direction = "up";
          }
        } // elseでmapを移動する処理を書く(mapクラスが必要？)
      } else if (input.down) { // When user input arrow down
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (y < squareNumberY - 1) {
          if (passableSquare.includes(map[++y][x])) { 
            this.move = squareSize;
            input.push = 'down';
            this.direction = "down";
          }
        }
      } else if (input.left) { // When user input arrow left
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (x > 0) {
          if (passableSquare.includes(map[y][--x])) {
            this.move = squareSize;
            input.push = 'left';
            this.direction = "left";
          }
        }
      } else if (input.right) { // When user input arrow right
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (x < squareNumberX - 1) {
          if (passableSquare.includes(map[y][++x])) {
            this.move = squareSize;
            input.push = 'right';
            this.direction = "right";
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
      if (this.move === squareSize / 2) this.foot = !this.foot;
      if (!this.moved) this.moved = true;
    }
  }
}

export default Hero;
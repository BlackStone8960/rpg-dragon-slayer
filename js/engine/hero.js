import Sprite from './sprite.js';
import { map, passableTile, stateList } from '../main.js';
import { squareSize, centerX, centerY, squareNumberX, squareNumberY } from "./game.js";

const battleRate = 1; // for test
// const battleRate = 0.06;

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
    this.level = 1;
    this.hp = 64;
    this.mp = 4;
    this.attack = 20;
    this.defence = 9;
    this.evadeRate = 0.1;
    this.money = 0;
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
        if (Math.random() < battleRate) { // If battle begins
          window.gameState = stateList.battle; // Change state to battle mode
          input.up = false;
          input.down = false;
          input.left = false;
          input.right = false;
          input.enter = false;
          input.space = false;
          input.push = "default";
          return; // Stop hero and let him battle
        }
        this.moved = false;
      }
      if (input.up) { // When user input arrow up
        let x = this.x / squareSize; // x-coordinate of hero
        let y = this.y / squareSize; // y-coordinate of hero
        if (y > 0) {
          if (passableTile.includes(map.mapData[--y][x])) { // if hero can pass through
            this.move = squareSize;
            input.push = 'up';
            this.direction = "up";
          }
        } // elseでmapを移動する処理を書く(mapクラスが必要？)
      } else if (input.down) { // When user input arrow down
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (y < squareNumberY - 1) {
          if (passableTile.includes(map.mapData[++y][x])) { 
            this.move = squareSize;
            input.push = 'down';
            this.direction = "down";
          }
        }
      } else if (input.left) { // When user input arrow left
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (x > 0) {
          if (passableTile.includes(map.mapData[y][--x])) {
            this.move = squareSize;
            input.push = 'left';
            this.direction = "left";
          }
        }
      } else if (input.right) { // When user input arrow right
        let x = this.x / squareSize;
        let y = this.y / squareSize;
        if (x < squareNumberX - 1) {
          if (passableTile.includes(map.mapData[y][++x])) {
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

  saveStatus() {
    let status = {
      x: this.x,
      y: this.y,
      level: this.level,
      hp: this.hp,
      mp: this.mp,
      atk: this.attack,
      def: this.defence,
      evd: this.evadeRate,
      money: this.money
    };
    status = JSON.stringify(status);
    localStorage.setItem('statusOfHero', status);
  }
}

export default Hero;
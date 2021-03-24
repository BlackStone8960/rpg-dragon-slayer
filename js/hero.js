import Sprite from './sprite.js';
import { map, passableSquare } from './map.js';
import { squareSize, centerX, centerY, squareNumberX, squareNumberY } from "./game.js";

class Hero {
  constructor () {
    this.sprite = new Sprite("img/sprite_sheet.png");
    this.x = centerX;
    this.y = centerY;
    this.speed = 2;
    this.move = 0;
  }
  moveHero() {
    const input = window.gameInput;
    input.inputListener();
    window.game.add(this.sprite, this.x, this.y);
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

export default Hero;
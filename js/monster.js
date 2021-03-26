import Sprite from "./sprite.js";
import { squareSize } from "./game.js";

export default class Monster {
  constructor() {
    this.sprite = new Sprite("img/monsters_spriteSheet.png", 21, 19, 15, 15);
    this.hp = 10;
    this.mp = 0;
    this.attack = 3;
    this.defense = 1;
    this.evadeRate = 0.1;
  }
  render (ctx, frame) {
    ctx.drawImage(this.sprite.img, this.sprite.left, this.sprite.top, this.sprite.width, this.sprite.height, 
                  this.x, this.y, squareSize, squareSize);
  }
  // Implement function to delete image
}
import { squareSize } from './game.js';
import Tile from './tile.js';

export default class characterTile extends Tile {
  constructor (img, left, top, size, interval) {
    super(img, left, top, size);
    // direction of character (0: front, 1: left, 2: back, 3: right)
    this.direction = 0;
    // character's animation (can switch multiple images depending on number)
    this.animation = 0;
    this.interval = interval || 30; // interval between each sprites
  }

  render(canvas) {
    // if image is out of canvas, don't render it
    if (this.x + this.shiftX < -1 * squareSize || this.x + this.shiftX > canvas.width) return;
    if (this.y + this.shiftY < -1 * squareSize || this.y + this.shiftY > canvas.height) return;

    const _ctx = canvas.getContext('2d');
    _ctx.drawImage(
      this.img,
      this.left + this.direction * this.interval,
      this.top + this.animation * this.interval,
      this.size,
      this.size,
      this.x + this.shiftX,
      this.y + this.shiftY,
      squareSize,
      squareSize
    );
  }
}
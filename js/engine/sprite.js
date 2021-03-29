import { squareSize } from "./game.js";

export default class Sprite {
  constructor (img, left, top, width, height, frame) {
    this.img = new Image();
    this.img.src = img;
    this.left = left || 0;
    this.top = top || 0;
    this.width = width || 16;
    this.height = height || 16;
    this.x = this.y = 0;
    this.frame = frame || 0; // the number of image you want to show
    /* 
      it means number will be as below
       0  1  2 
       3  4  5
       6  7  8  
      you can only set a value of frame when sprites evenly spaced
    */
   this.vx = this.vy = 0; // moving speed
   this.shiftX = this.shiftY = 0; // shift the position of sprite
  }

  update(canvas) {
    // call the method to show images etc. on the screen
    this.render(canvas);

    // call the method which is used when moving sprite or causing events
    this.onEnterFrame();

    this.x += this.vx;
    this.y += this.vy;
  }

  render(canvas) {
    // if image is out of canvas, don't render it
    if (this.x + this.shiftX < -1 * this.width || this.x + this.shiftX > canvas.width) return;
    if (this.y + this.shiftY < -1 * this.height || this.y + this.shiftY > canvas.height) return;

    // the number of image on x, y axises
    const _frameX = this.frame % (this.img.width / this.width);
    const _frameY = ~~(this.frame / (this.img.width / this.width));

    const _ctx = canvas.getContext('2d');
    _ctx.drawImage(
      this.img,
      this.left ? this.left : this.width * _frameX,
      this.top ? this.top : this.height * _frameY,
      this.width,
      this.height,
      this.x + this.shiftX,
      this.y + this.shiftY,
      squareSize,
      squareSize
    );
  }

  /* This is used when moving sprite or causing events.
     You can override this when using */ 
  onEnterFrame() {}
}
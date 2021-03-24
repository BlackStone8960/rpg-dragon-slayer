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

export default Sprite;
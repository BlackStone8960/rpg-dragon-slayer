export default class Text {
  constructor(texts, maxLength, interval) {
    this._text = []; // property which begins with _ cannot be changed
    this._displayLength = 0; // the length of displayed string
    this._line = 0;
    this._visibleText = 0; // the index of current text
    this.texts = texts;
    this.font = "'Nunito', sans-serif";
    this.size = 24;
    this.weight = "normal";
    this.color = "#ffffff";
    this.maxLength = maxLength || 30;
    this.baseline = "top";
    this.interval = interval || 0; // speed of showing text
    this.x = this.y = 0;
    this.vx = this.vy = 0; // can move text in this speed
    this._width = 0;
    // this._height = 0;
    this._isCenter = false; // whether make text horizontal center 
    // this._isMiddle = false; // whether make text vertical center
  }

  center() {
    this._isCenter = true;
    return this; // enable method to chain
  }

  // middle() {
  //   this.baseline = "middle";
  //   this._isMiddle = true;
  //   return this;
  // }

  update(canvas, frame) {
    const _ctx = canvas.getContext('2d');
    _ctx.font = `${this.weight} ${this.size}px ${this.font}`;
    _ctx.fillStyle = this.color;
    _ctx.textBaseLine = this.baseline;
    if (this.texts[this._visibleText].length > 0 && this.texts[this._visibleText].length <= this.maxLength) this._width = _ctx.measureText(this.texts[this._visibleText]).width;
    else if (this.texts[this._visibleText].length > this.maxLength)  this._width = this.maxLength;

    if (this._isCenter) this.x = (canvas.width - this._width) / 2;

    this.render(_ctx, frame);
  }

  render(ctx, frame) {
    // ctx.fillStyle = this.color;
    // ctx.font = this.font;
    // ctx.textBaseLine = this.baseline;
    if (this.interval === 0){
      this._line = Math.ceil(this.texts[this._visibleText].length / this.maxLength);
      for (let i = 0; i < this._line; i++) {
        this._text[i] = this._text[i] || "";
        this._text[i] = this.texts[this._visibleText].substr(i * this.maxLength, this.maxLength);
        ctx.fillText(this._text[i], this.x, this.y + (i * 25));
      }
    } 
    else {
      if (this._displayLength < this.texts[this._visibleText].length && frame % this.interval === 0) {
        this._text[this._line] = this._text[this._line] || "";
        this._text[this._line] += this.texts[this._visibleText].charAt(this._displayLength++);
        this._displayLength % this.maxLength === 0 && this._line++;
      }
      for (let i = 0; i < this._line + 1; i++) {
        this._text[i] = this._text[i] || "";
        ctx.fillText(this._text[i], this.x, this.y + (i * 25));
      }
    }
  }

  next() {
    this._visibleText++;
    this._text = []; 
    this._displayLength = 0;
  }

  unvisible() {
    this._text = []; 
    this.texts = [""];
  }
}
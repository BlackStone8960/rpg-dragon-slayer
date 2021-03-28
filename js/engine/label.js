export default class Label {
  constructor(label, maxLength, interval) {
    this._text = []; // property which begins with _ cannot be changed
    this._displayLength = 0; // the length of displayed string
    this._line = 0;
    this._visibleText = 0; // the index of current text
    this.label = label;
    this.font = "24px 'Nunito', sans-serif";
    this.color = "#fff";
    this.maxLength = maxLength || 30;
    this.baseline = "top";
    this.interval = interval || 0; // speed of showing text
  }

  render(ctx, frame) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textBaseLine = this.baseline;
    if (this.interval === 0){
      this._line = Math.ceil(this.label[this._visibleText].length / this.maxLength);
      for (let i = 0; i < this._line; i++) {
        this._text[i] = this._text[i] || "";
        this._text[i] = this.label[this._visibleText].substr(i * this.maxLength, this.maxLength);
        ctx.fillText(this._text[i], this.x, this.y + (i * 25));
      }
    } 
    else {
      if (this._displayLength < this.label[this._visibleText].length && frame % this.interval === 0) {
        this._text[this._line] = this._text[this._line] || "";
        this._text[this._line] += this.label[this._visibleText].charAt(this._displayLength++);
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
    this.label = [""];
  }
}
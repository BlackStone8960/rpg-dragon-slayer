class Label {
  constructor(label, interval) {
    this._text = ""; // property which begins with _ cannot be changed
    this._charcnt = 0;
    this.label = label;
    this.font = "24px 'Nunito', sans-serif";
    this.color = "#fff";
    this.baseline = "top";
    this.interval = interval; // default speed of text
  }

  render(ctx, frame) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textBaseLine = this.baseline;
    if (this.interval === 0) ctx.fillText(this.label, this.x, this.y);
    else {
      if (this._charcnt < this.label.length && frame % this.interval === 0) {
        this._text += this.label.charAt(this._charcnt++);
      }
      ctx.fillText(this._text, this.x, this.y);
    }
  }

  unvisible() {
    this._text = "";
  }
}

export default Label;
class Label {
  constructor(label) {
    this.label = label;
    this.font = "24px 'Nunito', sans-serif";
    this.color = "#fff";
    this.baseline = "top";
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textBaseLine = this.baseline;
    ctx.fillText(this.label, this.x, this.y);
  }
}

export default Label;
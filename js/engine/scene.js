export default class Scene {
  constructor() {
    this.objs = [];
  }

  add (obj) {
    this.objs.push(obj);
  }

  update(canvas) {
    this.onEnterFrame();
  }

  onEnterFrame() {}
}
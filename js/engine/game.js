import Scene from './scene.js';

const squareSize = 32;
const squareNumberX = 21; // Needs to be odd
const squareNumberY = 15; // Needs to be odd
const canvasWidth = squareSize * squareNumberX;
const canvasHeight = squareSize * squareNumberY;
const centerX = squareNumberX % 2 === 1 ? (canvasWidth - squareSize) / 2 : canvasWidth / 2;
const centerY = squareNumberY % 2 === 1 ? (canvasHeight - squareSize) / 2 : canvasHeight / 2;

class Game {
  constructor (width, height) {
    // this.width = width || canvasWidth;
    // this.height = height || canvasHeight;
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.canvas.width = width || canvasWidth;
    this.canvas.height = height || canvasHeight;

    this.scenes = []; // Array to put scene in
    this.currentScene; // property to put current scene in

    this.frame = 0; // frame of this game

    // Object which has pair values of key name and whether key is pushed
    // ex. {up: false, down: true}
    this.input = {};

    // Object to connect properties and the key name 
    // ex. {up: "ArrowUp"}
    this._keys = {};
  }

  // add(sprite, x, y) {
  //   if(typeof x === "undefined") sprite.x = 0;
  //   else sprite.x = x;
  //   if(typeof y === "undefined") sprite.y = 0;
  //   else sprite.y = y;
  //   this.ctx.drawImage(sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, 
  //                 sprite.x, sprite.y, squareSize, squareSize);
  // }

  add(scene) {
    if (scene instanceof Scene) this.scenes.push(scene);
    else console.error('You can add Scene to Game!');
  }

  start() {
    this.keybind('up', 'ArrowUp');
    this.keybind('down', 'ArrowDown');
    this.keybind('left', 'ArrowLeft');
    this.keybind('right', 'ArrowRight');
    this.keybind('enter', 'Enter');
    this.keybind('space', ' ');

    this.currentScene = this.currentScene || this.scenes[0];

    this._mainLoop();

    this._setEventListener();
  }

  _mainLoop() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.currentScene.update();

    for (let i = 0; i < this.currentScene.objs.length; i++) {
      this.currentScene.objs[i].update(this.canvas);
    }
    this.frame++; // increment frame after every rendering

    requestAnimationFrame(this._mainLoop.bind(this));
  }

  _setEventListener() {
    const _keyEvent = e => {
      e.preventDefault();
      for(let key in this._keys) {
        switch(e.type) {
          case 'keydown' :
            if(e.key === this._keys[key]) this.input[key] = true;
            break;
          case 'keyup' :
            if(e.key === this._keys[key]) this.input[key] = false;
            break;
        }
      }
    }
    addEventListener('keydown', _keyEvent, { passive: false });
    addEventListener('keyup', _keyEvent, { passive: false });
  }

  keybind(name, key) {
    this._keys[name] = key;
    this.input[name] = false;
  }
}

export { Game, squareSize, squareNumberX, squareNumberY, canvasWidth, canvasHeight, centerX, centerY};
import { Game, squareSize, canvasWidth, canvasHeight, ctx } from "./game.js";
import Hero from "./hero.js";
import Sprite from "./sprite.js";
import { map } from "./map.js";
import Input from "./input.js";

window.game = new Game(canvasWidth, canvasHeight);
window.gameInput = new Input();

const floor1 = new Sprite("img/tile_set.png", 192, 240);
const wall1 = new Sprite("img/tile_set.png", 96, 208);
const hero = new Hero();

const main = () => {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Make Map class later
  // Make upper and lower limit change depending on hero's position
  for(let y = 0; y < map.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      switch(map[y][x]) {
        case 0: 
          window.game.add(floor1, x * squareSize, y * squareSize);
          break;
        case 1: 
          window.game.add(wall1, x * squareSize, y * squareSize);
          break;
      }
    }
  }

  hero.moveHero();

  requestAnimationFrame(main);
};

addEventListener('load', main);
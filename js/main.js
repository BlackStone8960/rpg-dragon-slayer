import { Game, squareSize, canvasWidth, canvasHeight, ctx } from "./game.js";
import Hero from "./hero.js";
import Sprite from "./sprite.js";
import { Map, mapData } from "./map.js";
import Input from "./input.js";
import Combat from "./combat.js";

window.game = new Game(canvasWidth, canvasHeight);
window.gameInput = new Input();

const stateList = {
  worldMap: "worldMap",
  localMap: "localMap",
  combat: "combat",
  gameOver: "gameOver",
  menu: "menu"
};

window.gameState = stateList.worldMap;
// People
const hero = new Hero();

// Tile
const floor1 = new Sprite("img/tile_set.png", 192, 240);
const wall1 = new Sprite("img/tile_set.png", 96, 208);

// Map (Default map is Tower 1) These operations should be in map.js I think...
let passableTile = [0]; // passable area 
// $.getJSON("json/map.json", (data) => {
//   mapData = data.tower1;
// });
let map = new Map(mapData.tower1, passableTile, floor1, wall1);  

// Combat
const combat = new Combat();

const main = () => {
  // color display black
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  if (window.gameState === "worldMap") {
    map.renderMap();
    hero.moveHero();
  } else if (window.gameState === "combat") {
    // Process between combat mode
  }
  requestAnimationFrame(main);
};

addEventListener('load', main);

export { map, passableTile, stateList };
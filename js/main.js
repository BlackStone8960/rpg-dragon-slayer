import { Game, squareSize, canvasWidth, canvasHeight, centerX, centerY } from "./game.js";
import Hero from "./hero.js";
import Sprite from "./sprite.js";
import { Map, mapData } from "./map.js";
import Input from "./input.js";
import Battle from "./battle.js";
// import Label from "./label.js";
// import Monster from "./monster.js";

window.game = new Game(canvasWidth, canvasHeight);
const game = window.game;
window.gameInput = new Input();

const stateList = {
  worldMap: "worldMap",
  localMap: "localMap",
  battle: "battle",
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

// Label

// Battle
const battle = new Battle();

const main = () => {
  // color display black
  game.ctx.fillStyle = "rgb(0, 0, 0)";
  game.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  if (window.gameState === "worldMap") {
    map.renderMap();
    hero.moveHero();
  } else if (window.gameState === "battle") {
    switch (battle.state){
      case "ready" :
        battle.ready();
        break;
      case "battle" :
        battle.start();
        break;
      case "result" :
        battle.result();
        break;
      case "end" :
        battle.end();
        break;
      default :
        console.log(`Error: battle.state is ${battle.state}`);
    }
    game.start();
  }
  // save hero's status to localStorage
  // if storage data changed, change hero object's property
  hero.saveStatus();
  requestAnimationFrame(main);
};

addEventListener('load', main);

export { map, passableTile, stateList };
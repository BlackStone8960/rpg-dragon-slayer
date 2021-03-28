import { Game, squareSize, canvasWidth, canvasHeight, centerX, centerY } from "./engine/game.js";
import Hero from "./engine/hero.js";
import Sprite from "./engine/sprite.js";
import { Map, mapData } from "./engine/map.js";
import Input from "./engine/input.js";
import Battle from "./engine/battle.js";
import Scene from "./engine/scene.js";
import Tilemap from "./engine/tilemap.js";
import Tile from "./engine/tile.js";

const stateList = {
  worldMap: "worldMap",
  localMap: "localMap",
  battle: "battle",
  gameOver: "gameOver",
  menu: "menu"
};

window.gameState = stateList.worldMap;

// Tile
const floor1 = new Sprite("img/tile_set.png", 192, 240);
const wall1 = new Sprite("img/tile_set.png", 96, 208);

// Map (Default map is Tower 1) These operations should be in map.js I think...
let passableTile = [0]; // passable area 
// $.getJSON("json/map.json", (data) => {
//   mapData = data.tower1;
// });

let map = new Map(mapData.tower1, passableTile, floor1, wall1);  

addEventListener('load', () => {

  window.game = new Game(canvasWidth, canvasHeight);
  const game = window.game;

  const map = [
    [273, 273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 273, 273, 273, 273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 273, 273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [273, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 363, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 363, 363, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 363, 363, 363, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 271, 363, 363, 363, 363, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 271, 271, 363, 363, 363, 363, 363, 363, 271, 271, 271, 271, 273, 273, 273, 273],
    [271, 271, 271, 271, 271, 271, 271, 363, 363, 363, 363, 363, 363, 363, 363, 271, 271, 271, 271, 273, 273, 273, 273]
  ]
  
  const WALKING_SPEED = 2;

  const scene = new Scene();

  const tileMap = new Tilemap("img/tile_set.png");
  tileMap.data = map;
  scene.add(tileMap);

  const hero = new Tile("img/sprite_sheet.png");
  scene.onEnterFrame = () => {
    if (game.input.up) hero.y -= WALKING_SPEED;
    if (game.input.down) hero.y += WALKING_SPEED;
    if (game.input.left) hero.x -= WALKING_SPEED;
    if (game.input.right) hero.x += WALKING_SPEED;
  };
  scene.add(hero);
  game.add(scene);


  // window.gameInput = new Input();

  // People
  // const hero = new Hero();
  // window.game.add(hero, centerX, centerY);
  // Battle
  // const battle = new Battle();

  // const main = () => {
    // color display black
    // game.ctx.fillStyle = "rgb(0, 0, 0)";
    // game.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
  // if (window.gameState === "worldMap") {
  //   map.renderMap();
    // hero.moveHero();
  // } else if (window.gameState === "battle") {
  //   switch (battle.state){
  //     case "ready" :
  //       battle.ready();
  //       break;
  //     case "battle" :
  //       battle.start();
  //       break;
  //     case "result" :
  //       battle.result();
  //       break;
  //     case "end" :
  //       battle.end();
  //       break;
  //     default :
  //       console.log(`Error: battle.state is ${battle.state}`);
  //   }
  // }

  // save hero's status to localStorage
  // if storage data changed, change hero object's property
  // hero.saveStatus();
  // requestAnimationFrame(main);
// };
  game.start();
});

// addEventListener('load', main);

export { map, passableTile, stateList };
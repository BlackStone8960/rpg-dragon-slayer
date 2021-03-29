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
  
  const TILE_SIZE = squareSize;

  const WALKING_SPEED = 2;

  const scene = new Scene();

  const tileMap = new Tilemap("img/tile_set.png");
  tileMap.data = map;
  // tileMap.x = centerX;
  // tileMap.y = centerY;

  scene.add(tileMap);

  const city = new Tile("img/tile_set.png", 288, 160)
  city.x = TILE_SIZE * 2;
  city.y = TILE_SIZE * 17;
  tileMap.add(city);

  const cave = new Tile("img/tile_set.png", 288, 176)
  cave.x = TILE_SIZE * 10;
  cave.y = TILE_SIZE * 2;
  tileMap.add(cave);

  const hero = new Tile("img/sprite_sheet.png");
  hero.x = centerX;
  hero.y = centerY;
  tileMap.add(hero);
  hero.isSynchronize = false;

  scene.onEnterFrame = () => {
    if (tileMap.x % TILE_SIZE === 0 && tileMap.y % TILE_SIZE === 0) {
      tileMap.vx = tileMap.vy = 0;
      if (game.input.left) tileMap.vx = WALKING_SPEED;
      else if (game.input.right) tileMap.vx = -1 * WALKING_SPEED;  
      else if (game.input.up) tileMap.vy = WALKING_SPEED;
      else if (game.input.down) tileMap.vy = -1 * WALKING_SPEED;

      // get hero's coordinate after he moving
      const heroCoordinateAfterMoveX = hero.mapX - tileMap.vx / WALKING_SPEED;
      const heroCoordinateAfterMoveY = hero.mapY - tileMap.vy / WALKING_SPEED;

      if (tileMap.hasObstacle(heroCoordinateAfterMoveX, heroCoordinateAfterMoveY)) {
        tileMap.vx = tileMap.vy = 0;
      }
      // console.log(`${hero.mapX} ${hero.mapY}`);
    }
  };

  game.add(scene);
  game.start();

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
});

// addEventListener('load', main);

export { map, passableTile, stateList };
import { squareSize } from "./game.js";

const mapData = {
	tower1 : [
		[0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0],
		[0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0 ,0],
		[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0],
		[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
		[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,0],
		[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0],
		[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
		[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,0],
		[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,0],
		[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,0 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1],
		[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0 ,0],
		[1, 0, 1, 1, 1, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0 ,0],
		[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1 ,1],
		[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0 ,0],
		[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0],
		[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
		[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
		[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0 ,0],
		[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,1],
		[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0],
		[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0]
	],
};

class Map {
  constructor (mapData, passableTile, tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9) {
		this.mapData = mapData;
		this.passableTile = passableTile;
		this.tile = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
	}
	renderMap() {
		// Make upper and lower limit change depending on hero's position
		for(let y = 0; y < this.mapData.length; y++) {
			for(let x = 0; x < this.mapData[y].length; x++) {
				switch(this.mapData[y][x]) {
					case 0: 
						window.game.add(this.tile[0], x * squareSize, y * squareSize);
						break;
					case 1: 
						window.game.add(this.tile[1], x * squareSize, y * squareSize);
						break;
					case 2: 
						window.game.add(this.tile[2], x * squareSize, y * squareSize);
						break;
					case 3: 
						window.game.add(this.tile[3], x * squareSize, y * squareSize);
						break;
					case 4: 
						window.game.add(this.tile[4], x * squareSize, y * squareSize);
						break;
					case 5: 
						window.game.add(this.tile[5], x * squareSize, y * squareSize);
						break;
					case 6: 
						window.game.add(this.tile[6], x * squareSize, y * squareSize);
						break;
					case 7: 
						window.game.add(this.tile[7], x * squareSize, y * squareSize);
						break;
					case 8: 
						window.game.add(this.tile[8], x * squareSize, y * squareSize);
						break;
					case 9: 
						window.game.add(this.tile[9], x * squareSize, y * squareSize);
						break;
					default : 
						console.log(`tile ID is incorrect. Detected ID is ${mapData[y][x]}.`);
				}
			}
		}
	}
}

export { Map, mapData };
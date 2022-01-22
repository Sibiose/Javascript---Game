//----------------------------IMPORTS------------------------------------

import { canvas, ctx } from "./main.js";
import game from "./game.js";

// =========================Obstacle class===========================
let enemyframeX = 0; // Helper variable that cycles through enemy animation

class Obstacle {
  constructor() {
    //=============Switch between different types of enemies============
    if (spawnHeight == 290) {
      this.image = ghostImage;
      this.spriteWidth = 261;
      this.spriteHeight = 209;
      this.width = this.spriteWidth / 3.6;
      this.height = this.spriteHeight / 3.3;
    } else {
      this.image = wormImage;
      this.spriteWidth = 229;
      this.spriteHeight = 171;
      this.width = this.spriteWidth / 3.3;
      this.height = this.spriteHeight / 3;
    }
    this.x = canvas.width;
    this.y = canvas.height - this.height - spawnHeight;
    this.speed = 1.1 * game.speed;
  }
  //Updating obstacle movement in relation to game Speed
  update() {
    this.x -= this.speed;
  }
  //Drawing the obstacles on canvas
  draw() {
    ctx.beginPath();
    ctx.drawImage(
      this.image,
      enemyframeX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.closePath();
    ctx.stroke();
  }
}
const obstaclesArray = [];

//=================Creating the Images for each enemy ==================
const ghostImage = new Image();
const wormImage = new Image();

ghostImage.src = "Resources/Characters/enemy_ghost.png";
wormImage.src = "Resources/Characters/enemy_worm.png";

//===================Handling height spawn for each enemy ================
let heightGenerator = 1;
let spawnHeight;

function handleHeight() {
  heightGenerator = Math.floor(Math.random() * 2 + 1);
  heightGenerator == 1 ? (spawnHeight = 230) : (spawnHeight = 290);
}

let enemyPassed = 0; // Helper variable that increments score for every enemy that left the screen withough triggering collision

function handleObstacles() {
  // New Obstacles are pushed into the obstacle array every 100 frames

  if ((game.frame == 0 || game.frame % 100 == 0) && game.stop != true) {
    handleHeight();
    obstaclesArray.push(new Obstacle());
  }
  // Drawing and updating obstacle movement on canvas
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
    obstaclesArray[i].draw();
  }
  // Splicing obstacles from the array when obstacles have left the gamescreen, as well as incrementing helper score variable.
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].x < 0 - obstaclesArray[i].width) {
      obstaclesArray.splice(i, 1);
      enemyPassed++;
    }
    //Reseting helper variable in order to reset score when game was lost
    if (!game.isActive) {
      enemyPassed = 0;
    }
  }
}
// looping trough enemy animation
const handleEnemyFrame = () => {
  if (game.frame % game.frameStagger == 0 && game.speed > 0) {
    enemyframeX < 5 ? enemyframeX++ : (enemyframeX = 0);
  }
};

export default Obstacle;
export { handleObstacles, handleEnemyFrame, obstaclesArray, enemyPassed };

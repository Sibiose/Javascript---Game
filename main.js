//----------------------------IMPORTS------------------------------------
import { handleObstacles, handleEnemyFrame } from "/obstacle.js";
import Player from "/player.js";
import collision from "/collision.js";
import background from "/background.js";
import score from "/score.js";
import game from "/game.js";
import { resetGameHeader } from "/game.js";
import state from "/state.js";

//---------------------------CANVAS SETUP------------------

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 700;
let canvas_height = canvas.height;
let canvas_width = canvas.width;

//======================PLAYER VARIABLE=======================

const player = new Player();

// ------------------ANIMATION LOOP----------------------

function animate() {
  //Clearing canvas from old paint

  ctx.clearRect(0, 0, canvas_width, canvas_height);

  //Starting the animation loop

  if (game.isActive) requestAnimationFrame(animate);
  game.frame++;

  //==============Background======================
  background.update();
  background.draw();

  //==============Player======================
  player.draw();
  player.update();
  state.update();

  //==============Obstacles and collision======================
  handleObstacles();
  handleEnemyFrame();
  collision.detect();
  game.lose();

  //==================Score========================

  score.draw();
  score.update();
}

//=================EVENT LISTENERS =====================

window.addEventListener("keydown", game.startGame);
window.addEventListener("keydown", keyPressed);
resetGameHeader.addEventListener("click", game.resetGame);

//================== SWITCHING BETWEEN KEYS PRESSED===================

function keyPressed(e) {
  if (e.key === "ArrowDown") {
    player.duck();
  } else if (e.key === " ") {
    player.jump();
  }
}

//=================Exports=========================

export { canvas, ctx, canvas_width, canvas_height, animate, player };

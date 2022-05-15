//----------------------------IMPORTS------------------------------------

import { animate, ctx, canvas_height, canvas_width, player } from "./main.js";
import collision from "./collision.js";
import { obstaclesArray, enemyPassed } from "./obstacle.js";
import score from "./score.js";

//-------------------------HTML QUERIES -------------------------------
const startGameHeader = document.querySelector(".start-game");
const resetGameHeader = document.querySelector(".reset-game");

//------------------------GAME CLASS-------------------------------

class Game {
  constructor() {
    this.frame = 0; // Variable that increments with every requestAnimationFrame iteration
    this.speed = 4;
    this.stop = false;
    this.isActive = false; // Checks if game has already started.
    this.frameStagger = 4; // Skips 4 frames before triggering the next animation sequence( High = fast, Low = slow)
  }

  //A method used to start the game and initiate the request animation frame loop.
  startGame(e) {
    if (!game.isActive && e.key === "Enter" && !collision.triggered) {
      startGameHeader.classList.add("hide");
      game.isActive = true;
      game.speed = 4;
      window.removeEventListener("keydown", game.startGame);
      animate();
    }
  }
  //This method checks if collision occured, and then disables player movement, as well as toggling the !game.isActive
  lose() {
    if (collision.triggered) {
      game.speed = 0;
      game.isActive = false;
      game.stop = true;
      player.frameY = 8;
      resetGameHeader.classList.remove("hide");
      player.jumping = true;
      player.ducking = true;
      if (game.frame % game.frameStagger == 0) {
        player.frameX < 6 ? player.frameX++ : null;
      }
    }
  }
  // A method that resets the initial values, like obstacleArray.length, player movement and the collision trigger.
  resetGame() {
    if (collision.triggered) {
      for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray.splice(i, 3);
      }
      game.stop = false;
      collision.triggered = false;
      resetGameHeader.classList.add("hide");
      ctx.clearRect(0, 0, canvas_width, canvas_height);
      startGameHeader.classList.remove("hide");
      player.jumping = false;
      player.ducking = false;
      score.scoreValue = 0;
      window.addEventListener("keydown", game.startGame);
    }
  }
}

const game = new Game();

export default game;
export { resetGameHeader };

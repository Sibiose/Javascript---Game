//----------------------------IMPORTS------------------------------------

import game from "./game.js";
import { ctx } from "./main.js";
import { enemyPassed } from "./obstacle.js";

//=========================SCORE CLASS===============================

class Score {
  constructor() {
    this.scoreValue = 0;
    this.scoreChange = false;
  }
  //Drawing the score on canvas
  draw() {
    ctx.font = "30px Georgia";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.scoreValue, 60, 60);
  }

  //Updating the score on canvas for every enemy that is avoided successfully
  // Each time score becomes a 20 multiple, the gamespeed increases. The level change tops at 200 score.

  update() {
    this.scoreValue = enemyPassed;
    if (this.scoreValue > 200) return;
    else if (
      !this.scoreChange &&
      this.scoreValue != 0 &&
      this.scoreValue % 20 == 0
    ) {
      game.speed += 1;
      this.scoreChange = true;

      setTimeout(() => {
        this.scoreChange = false;
      }, 4000);
    }
  }
}

const score = new Score();

export default score;

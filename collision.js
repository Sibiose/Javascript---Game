//----------------------------IMPORTS------------------------------------
import { player } from "/main.js";
import { obstaclesArray } from "/obstacle.js";

//Creating a collision class
class Collision {
  constructor() {
    this.triggered = false;
  }

  //Here I created a collision detection that calculates if the hitboxes of player and obstacle overlap. I used a simple rectangle hitbox algorithm.

  detect() {
    for (let i = 0; i < obstaclesArray.length; i++) {
      if (
        player.x < obstaclesArray[i].x + obstaclesArray[i].width &&
        player.x + player.hitboxWidth > obstaclesArray[i].x + 20 &&
        player.hitboxY < obstaclesArray[i].y + obstaclesArray[i].height &&
        player.y + player.hitboxHeight > obstaclesArray[i].y
      ) {
        obstaclesArray[i].speed = 0;

        this.triggered = true;
      } else {
        return;
      }
    }
  }
}

const collision = new Collision();

export default collision;

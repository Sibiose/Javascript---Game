//----------------------------IMPORTS------------------------------------
import { ctx, canvas, canvas_height } from "/main.js";
import state from "/state.js";
import game from "/game.js";

//=========================CREATING PLAYER IMAGE=======================
const playerImg = new Image();
playerImg.src = "Resources/Characters/dog.png";

class Player {
  constructor() {
    this.spriteWidth = 575;
    this.spriteHeight = 523;
    this.width = this.spriteWidth / 6;
    this.height = this.spriteHeight / 5;
    this.x = 20;
    this.y = canvas.height - this.height - 230;
    //------Hitbox width and height----

    this.hitboxWidth = this.width;
    this.hitboxHeight = this.height;
    this.hitboxY = this.y;

    this.weight = 0.2; // simulating gravity for a smooth jump
    this.vy = 0; // Vertical movement on Y axis
    this.va = 1; // Vertical acceleration
    this.jumping = false; // checking if player is mid-jump
    this.ducking = false; //checking if player is mid-duck
    this.frameX = 0; //animation loop helper variable
    this.frameY = 0; //animation loop helper variable
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(
      playerImg,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.y += this.vy * this.va; // Boosting vertical movement by acceleration
    this.va > 1 ? this.va-- : null; // Acceleration drops every frame after jumping

    if (this.y < canvas_height - this.height - 230) {
      this.vy += this.weight; // If player is mid-air, the weight will pull down generating negative vertical movement on y axis.
    } else {
      this.vy = 0;
      this.jumping = false;
    }

    this.frameY = state.current; // Switching between player states

    //Looping trough player animation
    if (game.frame % game.frameStagger == 0 && game.speed > 0) {
      this.frameX < 6 ? this.frameX++ : (this.frameX = 0);
    }
  }
  // Jump method that generates vertical movement and acceleration
  jump() {
    if (!this.jumping && !this.ducking) {
      this.jumping = true;
      this.vy = -5;
      this.va = 7;
    }
  }
  //Duck method that lowers the player hitbox for a short period of time(800ms)
  duck() {
    if (!this.ducking && !this.jumping) {
      this.hitboxHeight / 2;
      this.hitboxY += 60;
      this.ducking = true;
      setTimeout(() => {
        this.ducking = false;
        this.hitboxHeight = this.height;
        this.hitboxY = this.y;

        this.frameY = 3;
      }, 800);
    }
  }
}

export default Player;

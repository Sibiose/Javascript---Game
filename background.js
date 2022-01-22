//----------------------------IMPORTS------------------------------------
import { ctx, canvas_height } from "./main.js";
import game from "./game.js";

//---Creating a new backgrond image
const bgImage = new Image();
bgImage.src = "Resources/Background/game_background_2.png";

//------Creating a new background image class

class Background {
  constructor() {
    this.x = 0;
    this.x2 = 3700;
  }
  update() {
    //This creates a loop that cycles between 2 images. Unfortunately, the image I chose for the game, doesnt have a continuous line of terrain. Therefore, the background jumps at the connection of the 2 images.
    this.x <= -3700 ? (this.x = 3700 - game.speed) : (this.x -= game.speed);
    this.x2 <= -3700 ? (this.x2 = 3700 - game.speed) : (this.x2 -= game.speed);
  }
  //Drawing the 2 images that will loop creating the infinite background.

  draw() {
    ctx.drawImage(bgImage, this.x, 0, 3840, canvas_height);
    ctx.drawImage(bgImage, this.x2, 0, 3840, canvas_height);
  }
}

const background = new Background();

export default background;

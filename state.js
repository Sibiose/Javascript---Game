//----------------------------IMPORTS------------------------------------

import collision from "./collision.js";
import { player } from "./main.js";
//========================== STATE SWITCHER CLASS ==================
class State {
  constructor() {
    this.current = 3;
  }
  //================Updating player state ========================
  update() {
    if (player.jumping) {
      this.current = 1;
    } else if (player.ducking) {
      this.current = 6;
    } else if (collision.triggered) {
      this.current = 8;
    } else {
      this.current = 3;
    }
  }
}

const state = new State();

export default state;

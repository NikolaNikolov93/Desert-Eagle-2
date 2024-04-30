import * as PIXI from "pixi.js";
import Hero from "./Game/hero/Hero";
import Background from "./Game/background/Background";

/**
 * Initialize application
 */
const app = new PIXI.Application();
await app.init({ width: 1024, height: 700 });
/**
 * Append application to document
 */
const appCanvas = document.getElementById("app");
if (appCanvas) {
  appCanvas.appendChild(app.canvas);
}
/**
 * Initialize background by calling Bacground class
 */
let background = new Background({ app });
background.loadAssets();

/**
 * Initialize hero by calling Hero class
 */
let hero = new Hero({ app });
hero.loadAssets();

/**
 * Hero movement logic
 */
interface Keys {
  [key: string]: boolean;
}

let keys: Keys = {};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
document.addEventListener("keypress", hero.dropBomb);

function keyDown(e: any) {
  keys[e.code] = true;
}

function keyUp(e: any) {
  keys[e.code] = false;
}

/**
 * Game Loop
 */
app.ticker.add(() => {
  //Background animation call
  background.update();
  //Listen for her movement and updating the position
  if (keys["ArrowUp"]) {
    hero.move("ArrowUp");
  }
  if (keys["ArrowDown"]) {
    hero.move("ArrowDown");
  }
  if (keys["ArrowLeft"]) {
    hero.move("ArrowLeft");
  }
  if (keys["ArrowRight"]) {
    hero.move("ArrowRight");
  }
});

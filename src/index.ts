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
let hero = new Hero({ app });
hero.loadAssets();
/**
 * Game Loop
 */
app.ticker.add(() => {
  background.update();
  hero.update();
});

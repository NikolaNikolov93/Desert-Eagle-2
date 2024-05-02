import * as PIXI from "pixi.js";
import Background from "./Game/background/background";
import Hero from "./Game/hero/hero";
import HeroBomb from "./Game/heroBomb/heroBomb";
import Rock from "./Game/rock/rock";
import getRandomScale from "./helpers/getRandomScale.ts";
import getRandomSpawnTime from "./helpers/getRandomSpawnTime.ts";

const APP_WIDTH: number = 1024;
const APP_HEIGHT: number = 700;
/**
 * Initialize application
 */

const app = new PIXI.Application();
await app.init({ width: APP_WIDTH, height: APP_HEIGHT });
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

/**
 * Event listeners for hero movement
 */
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
/**
 * Event listenr for hero dropping bomb
 */
document.addEventListener("keypress", dropBomb);

//Hero movement handlers
function keyDown(e: any) {
  keys[e.code] = true;
}

function keyUp(e: any) {
  keys[e.code] = false;
}
/**
 * On hero drop bomb --> Creates bomb and adds ticker to update bomb position
 */
function dropBomb() {
  const heroBomb = new HeroBomb({ app }, hero);

  heroBomb.loadBomb();
  app.ticker.add(() => {
    heroBomb.update();
  });
}

function spawnObstacle(scale: number) {
  const rock = new Rock({ app }, hero, scale);
  rock.loadRock();
  app.ticker.add(() => {
    rock.update();
  });
}

let obstacleSpawnerTimer = 0;
let obstacleSpanwerInterval = getRandomSpawnTime(3, 10);

/**
 * Game Loop
 */
app.ticker.add((delta) => {
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

  obstacleSpawnerTimer += delta.deltaMS / 1000;

  if (obstacleSpawnerTimer >= obstacleSpanwerInterval) {
    obstacleSpanwerInterval = getRandomSpawnTime(3, 10);
    console.log(obstacleSpanwerInterval);

    // Spawn an obstacle every 3 seconds
    let obstacleScale = getRandomScale(1, 1.6);
    spawnObstacle(obstacleScale);
    obstacleSpawnerTimer = 0;
  }
});

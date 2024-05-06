import * as PIXI from "pixi.js";
import Background from "./Game/background/background";
import Hero from "./Game/hero/hero";
import HeroBomb from "./Game/heroBomb/heroBomb";
import Rock from "./Game/rock/rock";
import getRandomScale from "./helpers/getRandomScale.ts";
import getRandomSpawnTime from "./helpers/getRandomSpawnTime.ts";
import Enemy from "./Game/enemy/enemy.ts";
import Distance from "./Game/distance/Distance.ts";

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
 * Initialize distance
 */
localStorage.setItem("distasnce", "0");
let distance = new Distance({ app }, background);
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
    if (heroBomb.isLoaded) {
      heroBomb.update();
    }
  });
}
function spawnEnemy() {
  const enemy = new Enemy({ app });
  enemy.loadEnemy();
  app.ticker.add(() => {
    if (enemy.isLoaded) {
      enemy.update();
    }
  });
}

function spawnObstacle(scale: number) {
  const rock = new Rock({ app }, hero, scale);
  rock.loadRock();
  app.ticker.add(() => {
    if (rock.isLoaded) {
      rock.update();
      rock.checkForCollision();
    }
  });
}
//Set spawner timer
let obstacleSpawnerTimer = 0;
//Set initial spawn interval
let obstacleSpanwerInterval = getRandomSpawnTime(3, 10);

/**
 * Game Loop
 */
app.ticker.add((delta) => {
  //Background animation call
  background.update();
  distance.updateDistance();
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
  /**
   * App ticker recieves a callback function with delta parameter
   * it represents the time since last tick(frame) in miliseconds
   * We imcrement the timer with the delta time on each frame to keep track of time
   * If the obstacleSpawner exceeds the obstacleInterval(random number between 3 and 10) it we spawn
   * new obstacle
   */
  obstacleSpawnerTimer += delta.deltaMS / 1000;

  if (obstacleSpawnerTimer >= obstacleSpanwerInterval) {
    //Set new spanw interval to create randomness when spawning obstacles
    obstacleSpanwerInterval = getRandomSpawnTime(3, 10);

    // Spawn an obstacle with random scale and reset timer
    let obstacleScale = getRandomScale(1, 1.6);
    spawnObstacle(obstacleScale);
    spawnEnemy();
    obstacleSpawnerTimer = 0;
  }
});

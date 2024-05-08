import * as PIXI from "pixi.js";
import Hero from "../hero/hero";
interface App {
  stage: PIXI.Container;
  canvas: any;
}

export default class Enemy {
  private app: App;
  private enemy: any;
  isLoaded: boolean;
  private hero: Hero;
  constructor({ app }: { app: App }, hero: Hero) {
    this.enemy = PIXI.Sprite;
    this.app = app;
    this.isLoaded = false;
    this.hero = hero;
  }

  /**
   * Loads the bomb texture and adds it to the stage
   */
  async loadEnemy() {
    await PIXI.Assets.load("static/enemy/enemy.png");
    const texture = PIXI.Texture.from("static/enemy/enemy.png");
    const enemy = PIXI.Sprite.from(texture);
    enemy.width = 100;
    enemy.height = 76;
    enemy.x = this.app.canvas.width;
    enemy.y = 600;

    this.enemy = enemy;
    this.isLoaded = true;

    this.app.stage.addChild(enemy);
  }
  /**
   * Updates the bomb position and checks if its out of screen,removes it from the stage
   */
  update() {
    if (this.isLoaded) {
      if (this.enemy.x <= 0 - this.enemy.width) {
        this.app.stage.removeChild(this.enemy);
        this.enemy.destroy();

        this.isLoaded = false;
      } else {
        this.enemy.x -= 3;
      }
    }
  }
  checkForHitByHero() {
    if (this.isLoaded && this.hero.bomb.isLoaded) {
      const heroBomb = this.hero.bomb.bomb;
      // Calculate bounds for hero's bomb
      const heroBombBounds = heroBomb.getBounds();

      // Calculate bounds for enemy
      const enemyBounds = this.enemy.getBounds();

      // Check for collision
      if (
        heroBombBounds.x + heroBombBounds.width > enemyBounds.x &&
        heroBombBounds.x < enemyBounds.x + enemyBounds.width &&
        heroBombBounds.y + heroBombBounds.height > enemyBounds.y &&
        heroBombBounds.y < enemyBounds.y + enemyBounds.height
      ) {
        // remove the enemy and bomb from the stage when collsion is detected
        this.app.stage.removeChild(this.enemy);
        this.app.stage.removeChild(heroBomb);
        this.enemy.destroy();
        this.isLoaded = false;
      }
    }
  }
}

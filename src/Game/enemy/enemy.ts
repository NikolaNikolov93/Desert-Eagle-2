import * as PIXI from "pixi.js";
interface App {
  stage: PIXI.Container;
  canvas: any;
}

export default class Enemy {
  private app: App;
  private enemy: any;
  isLoaded: boolean;
  constructor({ app }: { app: App }) {
    this.enemy = PIXI.Sprite;
    this.app = app;
    this.isLoaded = false;
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
}

import * as PIXI from "pixi.js";
import Hero from "../hero/hero";

interface App {
  stage: PIXI.Container;
  canvas: any;
}

export default class HeroBomb {
  private app: App;
  private hero: Hero;
  private bomb: any;
  constructor({ app }: { app: App }, hero: Hero) {
    this.app = app;
    this.hero = hero;
    this.bomb = PIXI.Sprite;
  }

  /**
   * Loads the bomb texture and adds it to the stage
   */
  async loadBomb() {
    await PIXI.Assets.load("static/ammo/planeBomb.png");
    const texture = PIXI.Texture.from("static/ammo/planeBomb.png");
    const bomb = PIXI.Sprite.from(texture);
    bomb.width = 50;
    bomb.height = 25;
    bomb.x = this.hero.getBounds().x + this.hero.getBounds().width / 2;
    bomb.y = this.hero.getBounds().y + this.hero.getBounds().height / 2;
    bomb.rotation = 1.6;
    this.bomb = bomb;

    this.app.stage.addChild(bomb);
  }
  /**
   * Updates the bomb position and checks if its out of screen,removes it from the stage
   */
  update() {
    if (this.bomb.y > this.app.canvas.height) {
      this.app.stage.removeChild(this.bomb);
    }
    this.bomb.y += 4;
    this.bomb.x -= 1;
  }
}

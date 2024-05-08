import * as PIXI from "pixi.js";
import Hero from "../hero/hero";

interface App {
  stage: PIXI.Container;
  canvas: any;
}
export default class Rock {
  private app: App;
  private hero: Hero;
  private rock: any;
  private scale: number;
  isLoaded: boolean;

  constructor({ app }: { app: App }, hero: Hero, scale: number) {
    this.app = app;
    this.hero = hero;
    this.rock = PIXI.Sprite;
    this.scale = scale;
    this.isLoaded = false;
  }

  /**
   * Loads the graphics for the rock
   */
  async loadRock() {
    await PIXI.Assets.load("static/terrain/rockDown.png");
    const texture = PIXI.Texture.from("static/terrain/rockDown.png");
    const rock = PIXI.Sprite.from(texture);
    rock.x = this.app.canvas.width;
    rock.y = 0;
    rock.zIndex = 2;
    rock.scale = this.scale;

    this.rock = rock;
    this.isLoaded = true;
    this.app.stage.addChild(rock);
  }
  /**
   * Updates the position of the rock to simulate movement
   */
  update() {
    if (this.isLoaded) {
      if (this.rock.x <= -this.rock.width) {
        this.app.stage.removeChild(this.rock);
        this.rock.destroy();
        this.isLoaded = false;
      } else {
        this.rock.x -= 2;
      }
    }
  }

  /**
   * Checks for collision between the rock and the hero
   */
  checkForCollision() {
    if (this.isLoaded) {
      if (
        this.hero.getBounds().x + this.hero.getBounds().width >= this.rock.x &&
        this.hero.getBounds().x <= this.rock.x + this.rock.width &&
        this.hero.getBounds().y + this.hero.getBounds().height >= this.rock.y &&
        this.hero.getBounds().y <= this.rock.y + this.rock.height
      ) {
        window.location.href = "/endGame.html";
      }
    }
  }
}

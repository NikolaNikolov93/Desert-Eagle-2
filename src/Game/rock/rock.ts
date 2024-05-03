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

  constructor({ app }: { app: App }, hero: Hero, scale: number) {
    this.app = app;
    this.hero = hero;
    this.rock = PIXI.Sprite;
    this.scale = scale;
  }
  async loadRock() {
    await PIXI.Assets.load("static/terrain/rockDown.png");
    const texture = PIXI.Texture.from("static/terrain/rockDown.png");
    const rock = PIXI.Sprite.from(texture);
    rock.x = this.app.canvas.width;
    rock.y = 0;
    rock.zIndex = 2;
    rock.scale = this.scale;

    this.rock = rock;
    this.app.stage.addChild(rock);
  }
  update() {
    if (this.rock.x <= -this.rock.width) {
      this.app.stage.removeChild(this.rock);
    }
    this.rock.x -= 2;
  }
  checkForCollision() {
    if (
      this.hero.getBounds().x + this.hero.getBounds().width >= this.rock.x &&
      this.hero.getBounds().x <= this.rock.x + this.rock.width &&
      this.hero.getBounds().y + this.hero.getBounds().height >= this.rock.y &&
      this.hero.getBounds().y <= this.rock.y + this.rock.width
    ) {
      console.log("hit");
    }
  }
}

import * as PIXI from "pixi.js";
PIXI.Assets.add({ alias: "hero1", src: "static/hero/planeRed1.png" });
PIXI.Assets.add({ alias: "hero3", src: "static/hero/planeRed3.png" });
PIXI.Assets.add({ alias: "hero3", src: "static/hero/planeRed3.png" });

interface App {
  stage: PIXI.Container;
  canvas: any;
}

export default class Hero {
  private app: App;
  private assets: PIXI.Texture[];
  private hero: any;

  constructor({ app }: { app: App }) {
    this.app = app;
    this.assets = [];
    this.hero;
  }
  /**
   *
   * @returns the hero position and size
   */
  getBounds() {
    return {
      x: this.hero.x,
      y: this.hero.y,
      height: this.hero.height,
      width: this.hero.width,
    };
  }
  /**
   * Loads the hero images and loops thru them to create animation effect of propellers spinning
   */
  async loadAssets() {
    await PIXI.Assets.load(["hero1", "hero3", "hero3"]).then((graphics) => {
      for (const key in graphics) {
        this.assets.push(graphics[key]);
      }
    });
    const animatedPlane = new PIXI.AnimatedSprite(this.assets);
    animatedPlane.x = 100;
    animatedPlane.y = 300;
    animatedPlane.zIndex = 1;
    animatedPlane.animationSpeed = 0.4;
    animatedPlane.play();
    this.hero = animatedPlane;
    this.app.stage.addChild(animatedPlane);
  }
  /**
   *
   * @param direction string
   * Moves the plane in specific direction and checks if hero goes out of screen to stop movement
   */
  move(direction: string) {
    switch (direction) {
      case "ArrowUp":
        if (this.hero.y >= 0) {
          this.hero.y -= 3;
        }

        break;
      case "ArrowDown":
        if (this.hero.y <= this.app.canvas.height - this.hero.height) {
          this.hero.y += 3;
        }

        break;
      case "ArrowLeft":
        if (this.hero.x > 0) {
          this.hero.x -= 3;
        }
        break;
      case "ArrowRight":
        if (this.hero.x <= this.app.canvas.width - this.hero.width) {
          this.hero.x += 3;
        }
        break;
    }
  }
}

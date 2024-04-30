import * as PIXI from "pixi.js";
PIXI.Assets.add({ alias: "hero1", src: "static/hero/planeRed1.png" });
PIXI.Assets.add({ alias: "hero3", src: "static/hero/planeRed3.png" });
PIXI.Assets.add({ alias: "hero3", src: "static/hero/planeRed3.png" });

interface App {
  stage: PIXI.Container;
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
  move(direction: string) {
    switch (direction) {
      case "ArrowUp":
        this.hero.y -= 3;
        break;
      case "ArrowDown":
        this.hero.y += 3;
        break;
      case "ArrowLeft":
        this.hero.x -= 3;
        break;
      case "ArrowRight":
        this.hero.x += 3;
        break;
    }
  }
}

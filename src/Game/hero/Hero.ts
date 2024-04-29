import * as PIXI from "pixi.js";
PIXI.Assets.add({ alias: "hero1", src: "static/hero/planeRed1.png" });
PIXI.Assets.add({ alias: "hero2", src: "static/hero/planeRed2.png" });
PIXI.Assets.add({ alias: "hero3", src: "static/hero/planeRed3.png" });

interface App {
  stage: PIXI.Container;
}

export default class Hero {
  private app: App;
  private assets: PIXI.Texture[];

  constructor({ app }: { app: App }) {
    this.app = app;
    this.assets = [];
  }
  async loadAssets() {
    const heroGraphics = await PIXI.Assets.load([
      "hero1",
      "hero2",
      "hero3",
    ]).then((graphics) => {
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
    this.app.stage.addChild(animatedPlane);
  }
  update() {}
}

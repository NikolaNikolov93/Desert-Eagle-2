import * as PIXI from "pixi.js";
interface App {
  stage: PIXI.Container;
}

export default class Background {
  private app: App;
  private assets: PIXI.Sprite[];
  constructor({ app }: { app: App }) {
    this.app = app;
    this.assets = [];
  }
  /**
   * Loads the background images
   */
  async loadAssets() {
    await PIXI.Assets.load("static/background/bg.png");
    const texture = PIXI.Texture.from("static/background/bg.png");
    for (let index = 0; index < 2; index++) {
      let bg = PIXI.Sprite.from(texture);
      bg.width = 1024;
      bg.height = 700;
      bg.x = this.app.stage.width * index;
      this.assets.push(bg);
      this.app.stage.addChild(bg);
    }
  }
  /**
   * Loops thru the assets array and crates an infinate animation to imitate background movement
   */
  update() {
    this.assets.forEach((asset) => {
      asset.x -= 3;
      if (asset.x <= -asset.width) {
        let distance = localStorage.getItem("distance");
        if (distance) {
          localStorage.setItem("distance", (parseInt(distance) + 1).toString());
        } else {
          localStorage.setItem("distance", "100");
        }
        asset.x += this.assets.length * asset.width;
      }
    });
  }
}

import * as PIXI from "pixi.js";
import Background from "../background/background";

interface App {
  stage: PIXI.Container;
}

export default class Distance {
  private app: App;
  private distanceText: PIXI.Text;
  backgorund: Background;
  distanceScore: any;
  constructor({ app }: { app: App }, backgrond: Background) {
    this.backgorund = backgrond;
    this.app = app;
    this.distanceText = new PIXI.Text();
    this.distanceScore = localStorage.getItem("distance");
    this.distanceText.zIndex = 3;
    // Position the text on the stage
    this.distanceText.position.set(10, 10); // Adjust position as needed

    // Add the text to the app stage
    this.app.stage.addChild(this.distanceText);
  }

  updateDistance() {
    const distance = localStorage.getItem("distance");

    // Update the text content with the current distance
    this.distanceText.text = `Distance score: ${distance}`;
  }
}

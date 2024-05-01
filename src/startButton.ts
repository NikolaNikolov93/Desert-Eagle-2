/**
 *
 */
const startButton = document.getElementById("start-game-button");

startButton?.addEventListener("click", () => {
  const script = document.createElement("script");
  script.src = "/src/index.ts";
  script.type = "module";
  script.id = "game";

  document.head.appendChild(script);
  const startGameScreen: any = document.getElementById("start-game-screen");
  document.body.removeChild(startGameScreen);
});

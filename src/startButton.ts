/**
 * On start game button click --> Add the game script to the head component
 *  and remove start game screen from the body
 */

// Select the start game button
const startButton = document.getElementById("start-game-button");

// Add click handler
startButton?.addEventListener("click", () => {
  const script = document.createElement("script");
  script.src = "/src/index.ts";
  script.type = "module";
  script.id = "game";

  //Add the script and remove the start game screen
  document.head.appendChild(script);
  const startGameScreen: any = document.getElementById("start-game-screen");
  document.body.removeChild(startGameScreen);
});

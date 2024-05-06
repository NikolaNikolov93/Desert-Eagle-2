const score = localStorage.getItem("distance");

const scoreText = document.getElementById("score");

if (scoreText) {
  scoreText.innerText = score
    ? `You travelled: ${score}km`
    : "Your travelled: 0";
}

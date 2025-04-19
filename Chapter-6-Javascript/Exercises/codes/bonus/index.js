// Select DOM elements
const rgbDisplay = document.getElementById("rgbDisplay");
const colorOptions = document.getElementById("colorOptions");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const restartBtn = document.getElementById("restartBtn");

// Game state variables
let score = 0;
let lives = 3;
let correctColor = "";

// Start the game
function startGame() {
  message.textContent = "";
  restartBtn.style.display = "none";
  generateColors();
}

// Generate random RGB values and setup options
function generateColors() {
  colorOptions.innerHTML = "";

  // Generate correct RGB color
  const r = getRandomNumber();
  const g = getRandomNumber();
  const b = getRandomNumber();
  correctColor = `rgb(${r}, ${g}, ${b})`;

  // Display RGB to guess
  rgbDisplay.textContent = correctColor;

  // Create options (one correct + two wrong)
  const colors = [correctColor];
  while (colors.length < 3) {
    const randomColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
    if (!colors.includes(randomColor)) {
      colors.push(randomColor);
    }
  }

  // Shuffle and create color boxes
  shuffle(colors).forEach(color => {
    const div = document.createElement("div");
    div.classList.add("color-box");
    div.style.backgroundColor = color;
    div.addEventListener("click", () => checkAnswer(color));
    colorOptions.appendChild(div);
  });
}

// Check if the user's guess is correct
function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    score++;
    message.textContent = "✅ Correct!";
  } else {
    lives--;
    message.textContent = "❌ Incorrect!";
  }

  updateScoreboard();

  // Check if game is over
  if (lives === 0) {
    endGame();
  } else {
    setTimeout(generateColors, 1000); // Load next round after short pause
  }
}

// Update score and lives on screen
function updateScoreboard() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
}

// Handle game over
function endGame() {
  message.textContent = `🎉 Game Over! Final Score: ${score}`;
  restartBtn.style.display = "inline-block";
  colorOptions.innerHTML = ""; // Clear options
}

// Restart the game
restartBtn.addEventListener("click", () => {
  score = 0;
  lives = 3;
  updateScoreboard();
  startGame();
});

// Utility functions
function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start first round
startGame();

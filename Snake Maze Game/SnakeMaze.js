let inputdir = { x: 0, y: 0 };
const foodSound = new Audio("songs/Food.wav");
const gameOverSound = new Audio("songs/Game_over.wav");
const moveSound = new Audio();
const musicSound = new Audio("songs/Game_sound.mp3");
let speed = 5;
let lastPaintTime = 0;
let scorebox = 0;
let snakeArr = [{ x: 3, y: 5 }];
food = { x: 14, y: 12 };
// let board = document.getElementsByClassName("board");
//Game Functions

function main(currtime) {
  window.requestAnimationFrame(main);
  // console.log(currtime);
  if ((currtime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currtime;

  gameEngine();
}

function isCollide(snake) {
  if (
    snake[0].y <= 0 ||
    snake[0].y >= 25 ||
    snake[0].x <= 0 ||
    snake[0].x >= 25
  ) {
    return true;
  }
  //if you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
}

function gameEngine() {
  //part 1 :updating the snake variable or array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game over. Press any key to play again!");
    snakeArr = [{ x: 3, y: 5 }];
    musicSound.play();
    scorebox = 0;
  }

  //if you have eaten food, increment score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    scorebox += 1;
    if (scorebox > hiscoreval) {
      hiscoreval = scorebox;
      localStorage.setItem("High-score", JSON.stringify(hiscoreval));
      highscore.innerHTML = "High-Score: " + hiscoreval;
    }
    score.innerHTML = "SCORE: " + scorebox;
    snakeArr.unshift({
      x: snakeArr[0].x + inputdir.x,
      y: snakeArr[0].y + inputdir.y,
    });
    let a = 2,
      b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; // in order to generate a random number, do a + (b-a)*math.random;;
  }

  //Moving the snake
  //har snake ke body segment ko uske aage wale segment ki jagah displace krenge
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;

  //part 2 :display the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y; //y is row and x is column
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y; //y is row and x is column
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic starts here
let highscore = localStorage.getItem("High-score");
if (highscore === null) {
  hiscoreval = 0;
  localStorage.setItem("High-score", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(highscore);
  highscore.innerHTML = "High-Score: " + hiscoreval;
}

window.requestAnimationFrame(main); // In order to paint screen again and again
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "Shift":
      console.log("ArrowUp");
      inputdir.x = 0;
      inputdir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputdir.x = 0;
      inputdir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputdir.x = 1;
      inputdir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x = -1;
      inputdir.y = 0;
      break;

    // case "Spacebar":
    //   console.log("Pause");
    //   break;

    default:
      break;
  }
});

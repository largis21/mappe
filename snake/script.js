const gameStartInput = document.getElementById("gameStartInput");
const gameSizeInput = document.getElementById("gameSizeInput");
const gameSizeText = document.getElementById("gameSizeText");
const gameSpeedInput = document.getElementById("gameSpeedInput");
const gameSpeedText = document.getElementById("gameSpeedText");
const pointsPerAppleInput = document.getElementById("pointsPerAppleInput");
const pointsPerAppleText = document.getElementById("pointsPerAppleText");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
drawBackground(ctx);

const dirUp = { xV: 0, yV: -1 };
const dirDown = { xV: 0, yV: 1 };
const dirLeft = { xV: -1, yV: 0 };
const dirRight = { xV: 1, yV: 0 };
let nextDir;

let animateInterval;

gameSizeInput.oninput = (e) => {
  gameSizeText.innerText = e.target.value;
};

gameSpeedInput.oninput = (e) => {
  gameSpeedText.innerText = `${e.target.value} fps`;
};

pointsPerAppleInput.oninput = (e) => {
  pointsPerAppleText.innerText = e.target.value;
};

gameStartInput.onclick = () => {
  startGame();
};

function startGame() {
  const pixelSize = 30;
  const gameSize = { x: gameSizeInput.value, y: gameSizeInput.value };
  const pointsPerApple = pointsPerAppleInput.value;
  const gameSpeed = gameSpeedInput.value;

  canvas.width = gameSize.x * pixelSize;
  canvas.height = gameSize.y * pixelSize;

  let gameState = {
    gameOver: false,
    apple: {
      x: tilfeldigNr(1, gameSize.x - 1) * pixelSize,
      y: tilfeldigNr(1, gameSize.y - 1) * pixelSize,
    },
    snakeVel: dirRight,
    snake: [{ x: 0, y: 0 }],
    score: 1,
  };

  nextDir = dirRight;

  if (animateInterval) clearInterval(animateInterval);

  animate(gameState, gameSize, pixelSize, pointsPerApple, gameSpeed);
}

function animate(gameState, gameSize, pixelSize, pointsPerApple, gameSpeed) {
  animateInterval = setInterval(() => {
    handleMovement(gameState, gameSize, pixelSize);
    if (gameState.gameOver) {
      clearInterval(animateInterval);
      return;
    }

    handleApple(gameState, gameSize, pixelSize, pointsPerApple);

    drawScreen(gameState, ctx, pixelSize);
  }, 1000 / gameSpeed);
}

document.addEventListener("keydown", handleControls);

function handleControls(e) {
  if (e.repeat) return;

  switch (e.key.toLowerCase()) {
    case "k":
      nextDir = dirUp;
      break;
    case "j":
      nextDir = dirDown;
      break;
    case "h":
      nextDir = dirLeft;
      break;
    case "l":
      nextDir = dirRight;
      break;
    case "w":
      nextDir = dirUp;
      break;
    case "s":
      nextDir = dirDown;
      break;
    case "a":
      nextDir = dirLeft;
      break;
    case "d":
      nextDir = dirRight;
      break;
    case "arrowup":
      nextDir = dirUp;
      break;
    case "arrowdown":
      nextDir = dirDown;
      break;
    case "arrowleft":
      nextDir = dirLeft;
      break;
    case "arrowright":
      nextDir = dirRight;
      break;
  }
}

function handleMovement(gameState, gameSize, pixelSize) {
  handleDirection(gameState);

  const head = gameState.snake[gameState.snake.length - 1];
  let newHead = {
    x: head.x + gameState.snakeVel.xV * pixelSize,
    y: head.y + gameState.snakeVel.yV * pixelSize,
  };

  if (newHead.x >= gameSize.x * pixelSize) newHead.x = 0;
  if (newHead.x < 0) newHead.x = gameSize.x * pixelSize - pixelSize;
  if (newHead.y >= gameSize.y * pixelSize) newHead.y = 0;
  if (newHead.y < 0) newHead.y = gameSize.y * pixelSize - pixelSize;

  let hitSelf = false;
  for (const segment of gameState.snake) {
    if (newHead.x === segment.x && newHead.y === segment.y) hitSelf = true;
  }

  if (hitSelf) gameState.gameOver = true;

  gameState.snake.push(newHead);
  gameState.snake.shift();
}

function handleDirection(gameState) {
  if (gameState.snakeVel === dirUp && nextDir === dirDown) return;
  if (gameState.snakeVel === dirDown && nextDir === dirUp) return;
  if (gameState.snakeVel === dirLeft && nextDir === dirRight) return;
  if (gameState.snakeVel === dirRight && nextDir === dirLeft) return;
  gameState.snakeVel = nextDir;
}

function handleApple(gameState, gameSize, pixelSize, pointsPerApple) {
  const head = gameState.snake[gameState.snake.length - 1];

  if (head.x === gameState.apple.x && head.y === gameState.apple.y) {
    for (let i = 0; i < pointsPerApple; i++) {
      gameState.snake.unshift({
        x: gameState.snake[0].x,
        y: gameState.snake[0].y,
      });
    }

    const newApple = generateNewApple(gameState, gameSize, pixelSize);
    gameState.apple = newApple;
    gameState.score += pointsPerApple;
  }
}

function generateNewApple(gameState, gameSize, pixelSize) {
  while (true) {
    const newApple = {
      x: tilfeldigNr(1, gameSize.x - 1) * pixelSize,
      y: tilfeldigNr(1, gameSize.y - 1) * pixelSize,
    };

    let inSnake = false;
    for (const segment of gameState.snake) {
      if (newApple.x === segment.x && newApple.y === segment.y) inSnake = true;
    }

    if (!inSnake) return newApple;
  }
}

function drawScreen(gameState, ctx, pixelSize) {
  drawBackground(ctx);
  drawApple(gameState, ctx, pixelSize);
  drawSnake(gameState, ctx, pixelSize);
}

function drawBackground(ctx) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}

function drawApple(gameState, ctx, pixelSize) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(
    gameState.apple.x + 2,
    gameState.apple.y + 2,
    pixelSize - 4,
    pixelSize - 4
  );
}

function drawSnake(gameState, ctx, pixelSize) {
  for (const i of gameState.snake) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.fillRect(i.x + 2, i.y + 2, pixelSize - 4, pixelSize - 4);
  }
}

function transformRange(value, minVal, maxVal, newMinVal, newMaxVal) {
  return (
    ((value - minVal) * (newMaxVal - newMinVal)) / (maxVal - minVal) + newMinVal
  );
}

function tilfeldigNr(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

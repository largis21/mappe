const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const playerSize = 100;
const playerWidth = 10;
const playerSpeed = 8;
const ballSize = 5;
const ballSpeed = 10;

let gameState = {
  p1: canvas.height / 2 - playerSize / 2,
  p2: canvas.height / 2 - playerSize / 2,
  gameOver: false,
  ball: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    xVel: 1,
    yVel: 0,
  },
};

function animate() {
  setInterval(() => {
    if (gameState.gameOver) return;
    handleMovement();

    gameState.ball.x += gameState.ball.xVel * ballSpeed;
    gameState.ball.y += gameState.ball.yVel * ballSpeed;

    handleBoundingBoxHit();

    drawScreen();
  }, 1000 / 60);
}

function handleBoundingBoxHit() {
  const rightSideHit =
    gameState.ball.x > canvas.width - 20 - playerWidth - ballSize;
  const leftSideHit = gameState.ball.x < 20 + playerWidth + ballSize;

  if (rightSideHit) {
    paddleHit = calculatePaddleHit("p2");
    gameState.ball.yVel = paddleHit;

    gameState.ball.xVel = -1;
  } else if (leftSideHit) {
    paddleHit = calculatePaddleHit("p1");
    gameState.ball.yVel = paddleHit;

    gameState.ball.xVel = 1;
  }

  const topHit = gameState.ball.y < 0;
  const bottomHit = gameState.ball.y > canvas.height - 20 - ballSize * 2;

  if (topHit) {
    gameState.ball.yVel = gameState.ball.yVel * -1;
  } else if (bottomHit) {
    gameState.ball.yVel = gameState.ball.yVel * -1;
  }
}

function calculatePaddleHit(p) {
  const paddleHit = transformRange(
    gameState.ball.y,
    gameState[p],
    gameState[p] + playerSize,
    -1,
    1
  );

  if (paddleHit < -1 || paddleHit > 1) gameState.gameOver = true;
  return paddleHit;
}

document.addEventListener("keydown", handleControls);
document.addEventListener("keyup", handleControls);

let keysDown = {
  w: false,
  s: false,
  up: false,
  down: false,
};

const controls = [
  {
    key: "w",
    keydown: () => (keysDown.w = true),
    keyup: () => (keysDown.w = false),
  },
  {
    key: "s",
    keydown: () => (keysDown.s = true),
    keyup: () => (keysDown.s = false),
  },
  {
    key: "arrowup",
    keydown: () => (keysDown.up = true),
    keyup: () => (keysDown.up = false),
  },
  {
    key: "arrowdown",
    keydown: () => (keysDown.down = true),
    keyup: () => (keysDown.down = false),
  },
];

function handleControls(e) {
  if (e.repeat) return;

  for (var i of controls) {
    if (i.key === e.key.toLowerCase()) {
      i[e.type]();
    }
  }
}

function handleMovement() {
  if (keysDown.w) {
    if (gameState.p1 > 0) {
      gameState.p1 += -1 * playerSpeed;
    }
  }
  if (keysDown.s) {
    if (gameState.p1 < canvas.height - playerSize) {
      gameState.p1 += 1 * playerSpeed;
    }
  }
  if (keysDown.up) {
    if (gameState.p2 > 0) {
      gameState.p2 += -1 * playerSpeed;
    }
  }
  if (keysDown.down) {
    if (gameState.p2 < canvas.height - playerSize) {
      gameState.p2 += 1 * playerSpeed;
    }
  }
}

function drawScreen() {
  drawBackground();

  ctx.strokeStyle = "white";
  ctx.lineWidth = playerWidth;

  ctx.beginPath();
  ctx.setLineDash([1, 0]);
  ctx.moveTo(20, gameState.p1);
  ctx.lineTo(20, gameState.p1 + playerSize);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([1, 0]);
  ctx.moveTo(canvas.width - 20, gameState.p2);
  ctx.lineTo(canvas.width - 20, gameState.p2 + playerSize);
  ctx.stroke();

  drawBall();
}

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();

  const middleWidth = 20;

  ctx.strokeWidth = middleWidth;
  ctx.beginPath();
  ctx.setLineDash([10, 10]);
  ctx.moveTo(canvas.width / 2 - middleWidth / 2, 0);
  ctx.lineTo(canvas.width / 2 - middleWidth / 2, canvas.height);
  ctx.stroke();
}

function drawBall() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "";
  ctx.beginPath();
  ctx.arc(gameState.ball.x, gameState.ball.y, ballSize, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
}

function transformRange(value, minVal, maxVal, newMinVal, newMaxVal) {
  return (
    ((value - minVal) * (newMaxVal - newMinVal)) / (maxVal - minVal) + newMinVal
  );
}

animate();

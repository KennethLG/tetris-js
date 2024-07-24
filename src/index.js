import config from "./config";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const board = config.INITIAL_BOARD;

canvas.width = config.WIDTH * config.BLOCK_SIZE;
canvas.height = config.HEIGHT * config.BLOCK_SIZE;

let lastTime = 0;
let accumulatedTime = 0;
const targetFPS = 30;
const interval = 1000 / targetFPS;

const createBoard = () => {
  for (let y = 0; y < config.WIDTH; y++) {
    for (let x = 0; x < config.HEIGHT; x++) {
      board[x][y] = 0;
    }
  }
  board[0][0] = 1;
}

createBoard()

const update = () => {

}

const draw = () => {
  console.log('drawing...');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawBoard();
}

const drawBoard = () => {
  board.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val === 1) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
          x * config.BLOCK_SIZE, 
          y * config.BLOCK_SIZE, 
          config.BLOCK_SIZE, 
          config.BLOCK_SIZE
      );
      }
    });
  });
}

const mainLoop = (timestamp) => {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  accumulatedTime += deltaTime;

  while (accumulatedTime >= interval) {
    update(interval);
    accumulatedTime -= interval;
  }

  draw();
  requestAnimationFrame(mainLoop);

}

requestAnimationFrame(mainLoop);
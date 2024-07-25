import config from "./config";
import { Game } from "./game";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = config.WIDTH * config.BLOCK_SIZE;
canvas.height = config.HEIGHT * config.BLOCK_SIZE;

let lastTime = 0;
let accumulatedTime = 0;
const targetFPS = 30;
const interval = 10000 / targetFPS;
const game = new Game();

const update = () => {
  if (game.current) {
    game.current.update(game.board);
  }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawBoard();

  if (game.current) {
    game.current.draw(ctx);
  }
}

const drawBoard = () => {
  game.board.forEach((row, y) => {
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
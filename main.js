import './style.css'

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 100;
canvas.height = 200;

let lastTime = 0;
let accumulatedTime = 0;
const targetFPS = 30;
const interval = 1000 / targetFPS;


const update = () => {

}

const draw = () => {
  console.log('drawing...');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.fill();
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
import { Block } from "./block";
import config from "./config";

export const isOutside = (block) => {
  const { shape, position } = block;

  if (position.x < 0 || position.x + shape[0].length > config.WIDTH) {
    return true;
  }

  return false;
}

export const isColliding = (block, board) => {
  const { shape, position } = block;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {

        if (position.y + y >= config.HEIGHT) {
          return true;
        }

        if (board[position.y + y][position.x + x] === 1) {
          return true;
        }
      }
    }
  }
  return false;
}

export class Game {
  constructor() {
    this.current;
    this.blocks = [];
    this.board = config.INITIAL_BOARD;
    this.createBoard();
    this.setUpKeyboard();
    this.addBlock();
    console.log(this.board)
  }

  update() {
    const lineAt = this.isLineAt();
    if (lineAt != -1) {
      this.board.splice(lineAt, 1);
      this.board.unshift(new Array(config.WIDTH).fill(0));
    } 
  }

  addBlock() {
    const shapes = Object.keys(config.BLOCKS);
    const shapeKey = shapes[Math.floor(Math.random()*shapes.length)];
    const shape = config.BLOCKS[shapeKey];
    this.current = new Block({ shape, game: this });
    this.blocks.push(this.current);
  }
  
  isLineAt() {
    for (let y = 0; y < this.board.length; y++) {
      const row = this.board[y];
      const line = row.every((val) => val === 1);
      if (line) {
        console.log(y);
        return y;
      }
    }
    return -1;
  }

  createBoard() {
    for (let y = 0; y < config.WIDTH; y++) {
      for (let x = 0; x < config.HEIGHT; x++) {
        this.board[y][x] = 0;
      }
    }
  }

  setUpKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (!this.current) return;

      switch (event.key) {
        case 'ArrowLeft':
          this.current.move(-1, 0, this.board);
          break;
        case 'ArrowRight':
          this.current.move(1, 0, this.board);
          break;
        case 'ArrowDown':
          this.current.move(0, 1, this.board);
          break;
        case 'ArrowUp':
          this.current.rotate(this.board);
          break;
      }
    });
  }
}
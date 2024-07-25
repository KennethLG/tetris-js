import config from "./config";
import { isColliding, isOutside } from "./game";

export class Block {
  constructor({ shape, game }) {
    this.shape = shape;
    this.game = game;
    this.position = { x: Math.floor(config.WIDTH / 2), y: 0 };
  }

  update(board) {
    this.move(0, 1, board);
  }

  placeOnBoard(board) {
    this.shape.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val === 1) {
          board[this.position.y + y][this.position.x + x] = 1;
        }
      });
    });
  }

  rotate() {
    const newShape = this.shape[0]
      .map((_, colIndex) => this.shape.map((row) => row[colIndex]))
      .reverse();

    // const originalShape = this.shape;
    this.shape = newShape;
  }

  move(offsetX, offsetY, board) {
    this.position.x += offsetX;
    this.position.y += offsetY;

    if (isOutside(this)) {
      this.position.x -= offsetX;
      this.position.y -= offsetY;
      return;
    }
    if (isColliding(this, board)) {
      this.position.x -= offsetX;
      this.position.y -= offsetY;
      this.placeOnBoard(board);
      this.game.addBlock();
    }
  }

  draw(ctx) {
    this.shape.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val === 1) {
          ctx.fillStyle = "red"; // Color of the block
          ctx.fillRect(
            (this.position.x + x) * config.BLOCK_SIZE,
            (this.position.y + y) * config.BLOCK_SIZE,
            config.BLOCK_SIZE,
            config.BLOCK_SIZE
          );
        }
      });
    });
  }
}

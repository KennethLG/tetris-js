import config from "./config";

export class Block {
  constructor({ shape }) {
    this.shape = shape;
    this.position = { x: Math.floor(config.WIDTH / 2), y: 0 };
  }

  update() {
    this.position.y++;
  }

  draw(ctx) {
    this.shape.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val === 1) {
          ctx.fillStyle = 'red'; // Color of the block
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
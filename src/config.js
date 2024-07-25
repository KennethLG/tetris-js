const BLOCKS = {
  I: [
    [1, 1, 1, 1]
  ],
  L: [
    [1, 1, 1],
    [0, 0, 1]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ]
};

const COLORS = []

const WIDTH = 10;
const HEIGHT = 20;

const getIinitialBoard = () => Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(0))

const INITIAL_BOARD = getIinitialBoard();

export default {
  BLOCK_SIZE: 16,
  BLOCKS,
  INITIAL_BOARD,
  WIDTH,
  HEIGHT,
  getIinitialBoard
}

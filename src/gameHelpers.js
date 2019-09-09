export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 18;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (
  player,
  stage,
  { x: nextMoveX, y: nextMoveY }
) => {
  for (let row = 0; row < player.tetromino.length; row += 1) {
    for (let cell = 0; cell < player.tetromino[row].length; cell += 1) {
      // 1. Check that we're on an actual Tetromino cell
      const cellIsTetromino = player.tetromino[row][cell] !== 0;

      if (cellIsTetromino) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We shouldn't go through the bottom of the play area
          !stage[row + player.pos.y + nextMoveY] ||
          // 3. Check that our move is inside the game areas width (x)
          !stage[row + player.pos.y + nextMoveY][
            cell + player.pos.x + nextMoveX
          ] ||
          // 4. Check that the cell wer'e moving to isn't set to clear
          stage[row + player.pos.y + nextMoveY][
            cell + player.pos.x + nextMoveX
          ][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
};

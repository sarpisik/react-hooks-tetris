import { useState, useCallback } from 'react';
import { TETROMINOS_SHAPES, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  // Hook
  const [player, setPlayer] = useState({
      pos: { x: 0, y: 0 },
      // Initial shape.
      tetromino: TETROMINOS_SHAPES[0].shape,
      collided: false
    }),
    rotate = (tetromino, dir) => {
      // Make the rows to become cols (transpose)
      const rotatedTetro = tetromino.map((_, index) =>
        tetromino.map(col => col[index])
      );
      // Reverse each row to get a rotated tetromino
      if (dir > 0) return rotatedTetro.map(row => row.reverse());
      return rotatedTetro.reverse();
    },
    playerRotate = (stage, dir) => {
      const clonedPlayer = JSON.parse(JSON.stringify(player));
      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

      const pos = clonedPlayer.pos.x;
      let offset = 1;
      while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
        clonedPlayer.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > clonedPlayer.tetromino[0].length) {
          rotate(clonedPlayer.tetromino, -dir);
          clonedPlayer.pos.x = pos;
          return;
        }
      }
      setPlayer(clonedPlayer);
    },
    updatePlayerPos = ({ x, y, collided }) =>
      setPlayer(prev => ({
        ...prev,
        // New coordinates of tetromino.
        pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
        collided
      })),
    resetPlayer = useCallback(() => {
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false
      });
    }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};

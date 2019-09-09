import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null),
    [gameOver, setGameOver] = useState(false),
    // Custom Hooks
    [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(),
    [stage, setStage, rowsCleared] = useStage(player, resetPlayer),
    [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
      rowsCleared
    ),
    // Actions
    movePlayer = dir => {
      // If we are not collided with anything, make the move.
      if (!checkCollision(player, stage, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0 });
      }
    },
    startGame = () => {
      // Reset everything
      setStage(createStage());
      setDropTime(1000);
      resetPlayer();
      setScore(0);
      setLevel(0);
      setRows(0);
      setGameOver(false);
    },
    drop = () => {
      // Increase level when player has cleared 10 rows
      if (rows > (level + 1) * 10) {
        setLevel(prev => prev + 1);
        // Also increase speed
        setDropTime(1000 / (level + 1) + 200);
      }

      // If we are not collided with anything, make the move.
      if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        // Game Over
        if (player.pos.y < 1) {
          console.log('GAME OVER!!!');
          setGameOver(true);
          setDropTime(null);
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
      }
    },
    keyUp = ({ keyCode }) => {
      if (!gameOver) {
        if (keyCode === 40) {
          setDropTime(1000);
        }
      }
    },
    dropPlayer = () => {
      setDropTime(null);
      drop();
    },
    move = ({ keyCode }) => {
      if (!gameOver) {
        if (keyCode === 37) {
          movePlayer(-1);
        } else if (keyCode === 39) {
          movePlayer(1);
        } else if (keyCode === 40) {
          dropPlayer();
        } else if (keyCode === 38) {
          playerRotate(stage, 1);
        }
      }
    };

  useInterval(() => drop(), dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score ${score}`} />
              <Display text={`Rows ${rows}`} />
              <Display text={`Level ${level}`} />
            </div>
          )}
          <StartButton callBack={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

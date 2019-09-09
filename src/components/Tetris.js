import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';

// Components
import Stage from './Stage';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
import Board from './Board';
import Buttons from './Buttons';

const GAME_BASE_SPEED = 1000;

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null),
    [gameStart, setGameStart] = useState(false),
    [gameOver, setGameOver] = useState(false),
    // Custom Hooks
    [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(),
    [stage, setStage, rowsCleared] = useStage(player, resetPlayer),
    [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
      rowsCleared
    ),
    // Actions
    startGame = () => {
      // Reset everything
      setStage(createStage());
      resetPlayer();
      setScore(0);
      setLevel(0);
      setRows(0);
      setGameStart(true);
      setGameOver(false);

      // Change dropTime to re-render Tetris so that useInterval makes game loop.
      setDropTime(GAME_BASE_SPEED);
    },
    movePlayer = dir => {
      // If we are not collided with anything, make the move.
      if (!checkCollision(player, stage, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0 });
      }
    },
    drop = () => {
      // Increase level when player has cleared 10 rows
      if (rows > (level + 1) * 5) {
        setLevel(prev => prev + 1);
        // Also increase speed
        setDropTime(GAME_BASE_SPEED / (level + 1) + 200);
      }

      // If we are not collided with anything, make the move.
      if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        // Game Over
        if (player.pos.y < 1) {
          setGameStart(false);
          setGameOver(true);

          // Break game loop.
          setDropTime(null);
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
      }
    },
    keyUp = ({ keyCode }) => {
      if (!gameOver) {
        if (keyCode === 40) {
          setDropTime(GAME_BASE_SPEED / (level + 1) + 200);
        }
      }
    },
    dropPlayer = () => {
      setDropTime(null);
      drop();
    },
    move = ({ keyCode }) => {
      if (!gameOver) {
        // Left arrow
        if (keyCode === 37) {
          movePlayer(-1);
          // Right arrow
        } else if (keyCode === 39) {
          movePlayer(1);
          // Down arrow
        } else if (keyCode === 40) {
          dropPlayer();
          // Up arrow
        } else if (keyCode === 38) {
          playerRotate(stage, 1);
        }
      }
    },
    moveByButton = ({ currentTarget: { name } }) => {
      switch (name) {
        case 'left':
          movePlayer(-1);
          break;

        case 'right':
          movePlayer(1);
          break;

        case 'down':
          dropPlayer();
          !gameOver && setDropTime(GAME_BASE_SPEED / (level + 1) + 200);
          break;

        default:
          playerRotate(stage, 1);
          break;
      }
    };

  // Run game loop.
  useInterval(drop, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={move}
      onKeyUp={keyUp}>
      <StyledTetris className="tetris">
        <Board gameOver={gameOver} status={{ score, rows, level }} />
        <Stage stage={stage} />
        <Buttons
          isGameStarted={!gameStart}
          handleMove={moveByButton}
          handleStartGame={startGame}
        />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

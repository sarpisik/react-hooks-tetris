import React, { Fragment } from 'react';
import Display from './Display';
import { StyledBoard } from './styles/StyledBoard';

const Board = ({ gameOver, status: { score, rows, level } }) => (
  <StyledBoard className="board" gameOver={gameOver}>
    {gameOver ? (
      <Display gameOver={gameOver} content="Game Over" />
    ) : (
      <Fragment>
        <Display title="Score" content={score} />
        <Display title="Rows" content={rows} />
        <Display title="Level" content={level} />
      </Fragment>
    )}
  </StyledBoard>
);

export default Board;

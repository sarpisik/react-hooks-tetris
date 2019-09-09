import React from 'react';
import { StyledStartButton } from './styles/StyledStartButton';

const StartButton = ({ gameStart, callBack }) => (
  <StyledStartButton>
    <button onClick={callBack}>
      {gameStart ? 'Restart Game' : 'Start Game'}
    </button>
  </StyledStartButton>
);

export default StartButton;

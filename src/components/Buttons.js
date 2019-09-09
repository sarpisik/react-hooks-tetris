import React from 'react';
import { StyledButtons } from './styles/StyledButtons';
import Controllers from './Controllers';
import StartButton from './StartButton';

const Buttons = ({ isGameStarted, handleMove, handleStartGame }) => (
  <StyledButtons>
    <Controllers disabled={isGameStarted} onClick={handleMove} />
    <StartButton gameStart={!isGameStarted} callBack={handleStartGame} />
  </StyledButtons>
);

export default Buttons;

import React from 'react';
import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';

const Stage = ({ stage }) => (
  <StyledStage
    className="stage"
    cellsRow={stage[0].length}
    cellsCol={stage.length}>
    {stage.map(row =>
      row.map((cell, index) => <Cell key={index} type={cell[0]} />)
    )}
  </StyledStage>
);

export default Stage;

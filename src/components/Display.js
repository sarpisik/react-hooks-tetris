import React, { Fragment } from 'react';
import { StyledDisplay } from './styles/StyledDisplay';

const Display = ({ gameOver, title, content }) => (
  <StyledDisplay className="display" gameOver={gameOver}>
    {gameOver || (
      <Fragment>
        {title} <hr />
      </Fragment>
    )}
    {content}
  </StyledDisplay>
);

export default Display;

import React from 'react';
import {
  StyledControllers,
  StyledController,
  StyledControllersRow
} from './styles/StyledControllers';
import arrow from '../img/arrow.png';
import dash from '../img/dash.png';
import rotate from '../img/rotate.png';

const buttons = [
  [
    { name: 'left', icon: arrow, className: 'left-arrow' },
    { name: 'right', icon: arrow }
  ],
  [{ name: 'down', icon: dash }, { name: 'rotate', icon: rotate }]
];

const Controller = ({ icon, ...props }) => (
  <StyledController {...props}>
    <img src={icon} alt={props.name} />
  </StyledController>
);

const Controllers = props => (
  <StyledControllers>
    {buttons.map((row, index) => (
      <StyledControllersRow key={index}>
        {row.map(button => (
          <Controller key={button.name} {...button} {...props} />
        ))}
      </StyledControllersRow>
    ))}
  </StyledControllers>
);

export default Controllers;

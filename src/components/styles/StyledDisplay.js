import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  align-items: center;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem;
  border: 4px solid #333;
  min-height: 30px;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: ${props => (props.gameOver ? '1.5rem' : '0.8rem')};
  max-width: ${props => (props.gameOver ? '10rem' : '6rem')};
  text-align: ${props => (props.gameOver ? 'center' : 'left')};
`;

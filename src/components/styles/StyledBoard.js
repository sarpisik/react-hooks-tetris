import styled from 'styled-components';

export const StyledBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${props => (props.gameOver ? 'center' : 'flex-start')};
`;

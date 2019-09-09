import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.cellsCol}, 1fr);
  grid-template-columns: repeat(${props => props.cellsRow}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  flex: 7;
  margin-bottom: 0.5rem;
  background: #111;
`;

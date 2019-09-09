import styled from 'styled-components';

export const StyledControllers = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledControllersRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

export const StyledController = styled.button`
  background-color: inherit;
  border: none;
  width: 5rem;
  outline: none;
  img {
    display: block;
    max-width: 100%;
  }
`;

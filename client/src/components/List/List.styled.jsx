import styled, { css } from 'styled-components';

export const ListStyled = styled.main`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export const ButtonStyled = styled.button`
  border: 1px solid #dbdbdb;
  border-radius: 0.375em;
  color: #363636;

  padding: 0.4em 0.8em;

  background-color: #fff;

  cursor: pointer;

  &:hover {
    border-color: ${({ isActive }) => !isActive && '#b5b5b5'};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #485fc7;
      border-color: #485fc7;
      color: #fff;
    `}
`;

export const ButtonsWrapperStyled = styled.div`
  display: flex;
  gap: 10px;

  align-self: center;

  padding-top: 50px;
`;

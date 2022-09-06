import styled, { css } from 'styled-components';

export const ButtonStyled = styled.button`
  border: none;
  padding: calc(0.5em - 1px) 1em;
  border-radius: 0.375em;

  font-size: 1rem;

  cursor: pointer;

  ${({ bg }) => {
    switch (bg) {
      case 'success':
        return css`
          background-color: #48c78e;
          color: #fff;

          padding: calc(1em - 1px) 2em;

          &:hover {
            background-color: #3ec487;
          }
        `;

      case 'danger':
        return css`
          background-color: #f14668;
          color: #fff;

          &:hover {
            background-color: #f03a5f;
          }
        `;

      case 'info':
        return css`
          background-color: #3e8ed0;
          color: #fff;

          &:hover {
            background-color: #3488ce;
          }
        `;

      default:
        return css`
          background-color: #fff;
        `;
    }
  }}
`;

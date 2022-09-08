import styled, { css } from 'styled-components';

export const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;

  padding: calc(0.5em - 1px) 1em;
  border-radius: 0.375em;

  font-size: 1rem;

  cursor: pointer;

  ${({ isRadio }) =>
    isRadio &&
    css`
      padding: 0;
      border-radius: 50%;
      width: 30px;
      height: 30px;
    `}

  ${({ bg }) => {
    switch (bg) {
      case 'success':
        return css`
          background-color: #48c78e;
          color: #fff;

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
          background-color: #485fc7;
          color: #fff;

          &:hover {
            background-color: #3e56c4;
          }
        `;

      case 'light':
        return css`
          background-color: transparent;
          color: rgba(10, 10, 10, 0.2);

          &:hover {
            color: rgba(10, 10, 10, 0.3);
          }
        `;

      default:
        return css`
          background-color: #fff;
          color: #363636;
          border: 1px solid #dbdbdb;

          &:hover {
            border-color: #b5b5b5;
          }
        `;
    }
  }}
`;

import styled, { css } from 'styled-components';

export const ListItemStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  justify-items: center;

  list-style: none;

  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  padding: 10px;

  & label svg {
    color: #363636;
  }

  &:hover div {
    opacity: 1;
  }

  @media screen and (min-width: 768px) {
    justify-items: initial;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr) auto;
  }
`;

export const LabelStyled = styled.label`
  display: flex;
  align-items: center;

  padding: 5px 10px;
  border-radius: 0.375em;
  justify-self: start;

  width: 100%;

  ${({ isEdit }) =>
    isEdit &&
    css`
      outline: 1px solid ${({ isError }) => (isError ? '#f14668' : '#485fc7')};
      box-shadow: ${({ isError }) =>
        isError
          ? '0 0 0 0.2em rgb(241 70 104 / 25%)'
          : '0 0 0 0.2em rgb(72 95 199 / 25%)'};
    `}

  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

export const InputStyled = styled.input`
  outline: none;
  border: none;
  background-color: #fff;

  border-radius: 0.375em;
  color: #363636;
  padding-left: 10px;

  justify-self: start;

  width: 100%;
`;

export const SelectStyled = styled.select`
  outline: none;
  border: none;
  background-color: #fff;

  border-radius: 0.375em;
  color: #363636;
  padding-left: 10px;

  justify-self: start;
`;

export const ButtonWrapperStyled = styled.div`
  display: flex;
  gap: 10px;

  opacity: ${({ isEdit }) => (isEdit ? '1' : '0.3')};
`;

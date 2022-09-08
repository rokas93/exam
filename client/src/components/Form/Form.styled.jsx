import styled from 'styled-components';

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  & label::before {
    content: '* ';
    color: red;
  }

  & label span {
    color: #f14668;
    font-size: 14px;

    position: absolute;
  }

  & button {
    justify-self: left;
    align-self: end;
  }
`;

export const InputStyled = styled.input`
  display: block;
  padding: 5px 10px;
  margin-top: 10px;
  width: 100%;

  box-shadow: ${({ isError }) =>
    isError
      ? '0 0 0 0.125em rgb(241 70 104 / 25%)'
      : 'inset 0 0.0625em 0.125em rgb(10 10 10 / 5%)'};
  background-color: #fff;

  border: 1px solid ${({ isError }) => (isError ? '#f14668' : '#dbdbdb')};

  border-radius: 0.375em;
  color: #363636;

  outline: none;

  &:focus {
    box-shadow: 0 0 0 0.125em rgb(72 95 199 / 25%);
    border-color: #485fc7;
  }
`;

export const SelectStyled = styled.select`
  display: block;
  padding: 5px 10px;
  margin-top: 10px;

  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);

  box-shadow: ${({ isError }) =>
    isError
      ? '0 0 0 0.125em rgb(241 70 104 / 25%)'
      : 'inset 0 0.0625em 0.125em rgb(10 10 10 / 5%)'};
  background-color: #fff;

  border: 1px solid ${({ isError }) => (isError ? '#f14668' : '#dbdbdb')};

  border-radius: 0.375em;
  color: #363636;

  outline: none;

  &:focus {
    box-shadow: 0 0 0 0.125em rgb(72 95 199 / 25%);
    border-color: #485fc7;
  }
`;

export const ButtonsWrapperStyled = styled.div`
  display: flex;
  gap: 10px;
`;

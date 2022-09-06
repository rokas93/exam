import styled from 'styled-components';

export const FormStyled = styled.form`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  & label input {
    display: block;
    padding: 5px 10px;
    margin-top: 10px;

    box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
    background-color: #fff;

    border: 1px solid #dbdbdb;

    border-radius: 0.375em;
    color: #363636;

    outline: none;

    &:focus {
      box-shadow: 0 0 0 0.125em rgb(72 95 199 / 25%);
      border-color: #485fc7;
    }
  }

  & button {
    justify-self: left;
    align-self: end;
  }
`;

import React from 'react';
import { ButtonStyled } from './Button.styled';

const Button = ({ text, action, bg, type }) => {
  return (
    <ButtonStyled type={type} onClick={action} bg={bg}>
      {text}
    </ButtonStyled>
  );
};

export default Button;

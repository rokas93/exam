import React from 'react';
import { ButtonStyled } from './Button.styled';

const Button = (props) => {
  return (
    <ButtonStyled
      type={props.type}
      onClick={props.action}
      bg={props.bg}
      isRadio={props.isRadio}
    >
      {props.text}
    </ButtonStyled>
  );
};

export default Button;

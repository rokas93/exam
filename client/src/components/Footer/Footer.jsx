import React from 'react';
import { FooterStyled } from './Footer.styled';

const Footer = () => {
  return (
    <FooterStyled>
      <p>All rights reserved &copy; {new Date().getFullYear()}</p>
    </FooterStyled>
  );
};

export default Footer;

import React from 'react';
import { CalendarIcon } from '../../assets/svgs';
import Button from '../Button';
import {
  HeaderContentStyled,
  HeaderHeadingStyled,
  HeaderParagraphStyled,
  HeaderStyled,
} from './Header.styled';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../features/userSlice';

const Header = ({ onOpen }) => {
  const users = useSelector(selectAllUsers);

  return (
    <HeaderStyled>
      <HeaderContentStyled>
        <CalendarIcon height={'50px'} width={'50px'} />
        <HeaderHeadingStyled>Create reservation now!</HeaderHeadingStyled>
        <HeaderParagraphStyled>
          Lorem ipsum dolor sit amet <strong>consectetur</strong>, adipisicing
          elit. Ullam, ratione!
        </HeaderParagraphStyled>
        <Button action={onOpen} bg={'success'} text={'Create reservation'} />
      </HeaderContentStyled>

      <HeaderParagraphStyled>
        Total reservations: <strong>{users.length}</strong>
      </HeaderParagraphStyled>
    </HeaderStyled>
  );
};

export default Header;

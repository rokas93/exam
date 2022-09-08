import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  padding: 20px;

  background-color: #f5f5f5;

  margin: 20px 0;

  & svg {
    color: #00d1b2;
  }

  @media screen and (min-width: 768px) {
    padding: 50px;
    flex-direction: row;
    align-items: flex-end;
  }
`;

export const HeaderContentStyled = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    text-align: left;
    align-items: flex-start;
  }
`;

export const HeaderHeadingStyled = styled.h2`
  color: #363636;
  font-weight: 600;
  line-height: 1.5;
`;

export const HeaderParagraphStyled = styled.p`
  font-size: 1em;
  color: #7a7a7a;

  max-width: 300px;

  margin-bottom: 10px;
`;

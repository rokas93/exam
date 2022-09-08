import styled from 'styled-components';

export const ModalOverlayStyled = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(10, 10, 10, 0.86);
`;

export const ModalWrapperStyled = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

export const ModalStyled = styled.div`
  max-width: 500px;
  width: 100%;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
`;

export const ModalContent = styled.div`
  padding: 20px;
`;

export const ModalHeaderWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #dbdbdb;
  background-color: #f5f5f5;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const ModalHeadingStyled = styled.p`
  color: #363636;
  font-size: 1.5rem;
`;

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalContent,
  ModalHeaderWrapperStyled,
  ModalHeadingStyled,
  ModalOverlayStyled,
  ModalStyled,
  ModalWrapperStyled,
} from './Modal.styled';
import { CloseIcon } from '../../assets/svgs';
import Form from '../Form';
import Button from '../Button';

const Modal = ({ onClose }) => {
  // Functions
  const closeOnOverlay = (e) => {
    if (e.target.dataset.id === 'modalWrapper') onClose();
  };

  // Side effects
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') onClose();
    });

    return () =>
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') onClose();
      });
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlayStyled></ModalOverlayStyled>
      <ModalWrapperStyled data-id='modalWrapper' onClick={closeOnOverlay}>
        <ModalStyled>
          <ModalHeaderWrapperStyled>
            <ModalHeadingStyled>Create reservation</ModalHeadingStyled>
            <Button
              action={onClose}
              bg={'light'}
              text={<CloseIcon height={'20px'} width={'20px'} />}
            />
          </ModalHeaderWrapperStyled>
          <ModalContent>
            <Form onClose={onClose} />
          </ModalContent>
        </ModalStyled>
      </ModalWrapperStyled>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;

import Image from 'next/image';
import '@reach/dialog/styles.css';
import {
  StyledContainer,
  StyledDialog,
  StyledModalHeader,
  StyledCloseBtn,
  StyledWhiteBorder,
} from './Modal.styled';
import { SubmitScore } from '../SubmitScore/SubmitScore';

interface ModalProps {
  showDialog: boolean;
  closeModal: () => void;
}

export const Modal = ({ showDialog, closeModal }: ModalProps) => {
  return (
    <StyledContainer>
      <StyledDialog isOpen={showDialog} onDismiss={closeModal}>
        <StyledCloseBtn onClick={closeModal}>
          <Image
            src="/assets/closeBtn.svg"
            alt=""
            width={20}
            height={20}
            priority
          />
        </StyledCloseBtn>
        <StyledModalHeader>
          <StyledWhiteBorder>
            <Image
              src="/assets/yellowPokeball.svg"
              alt=""
              width={50}
              height={50}
              priority
            />
          </StyledWhiteBorder>
        </StyledModalHeader>
        <SubmitScore />
      </StyledDialog>
    </StyledContainer>
  );
};

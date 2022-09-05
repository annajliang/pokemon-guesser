import Image from 'next/image';
import '@reach/dialog/styles.css';
import {
  StyledContainer,
  StyledDialog,
  StyledModalHeader,
  StyledCloseBtn,
  StyledWhiteBorder,
} from './Modal.styled';

interface ModalProps {
  showDialog: boolean;
  closeModal: () => void;
  variant: 'gameOver' | 'leaderboard';
  children: JSX.Element;
}

export const Modal = ({
  showDialog,
  closeModal,
  variant,
  children,
}: ModalProps) => {
  return (
    <StyledContainer>
      <StyledDialog
        isOpen={showDialog}
        onDismiss={closeModal}
        aria-labelledby="modalHeading"
      >
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
              src={
                variant === 'leaderboard'
                  ? `/assets/starIcon.svg`
                  : `/assets/yellowPokeball.svg`
              }
              alt=""
              width={65}
              height={65}
              priority
            />
          </StyledWhiteBorder>
        </StyledModalHeader>
        {children}
      </StyledDialog>
    </StyledContainer>
  );
};

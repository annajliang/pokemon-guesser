import Image from 'next/image';
import { useRecoilValue, useRecoilState } from 'recoil';
import '@reach/dialog/styles.css';
import {
  StyledContainer,
  StyledDialog,
  StyledModalHeader,
  StyledCloseBtn,
  StyledWhiteBorder,
} from './Modal.styled';
import { timerState, showModalsState } from '../../utils/globalState';

interface ModalProps {
  showDialog: boolean;
  closeModal: () => void;
  variant: 'submitScore' | 'leaderboard';
  children: JSX.Element;
}

export const Modal = ({
  showDialog,
  closeModal,
  variant,
  children,
}: ModalProps) => {
  const timer = useRecoilValue(timerState);
  const [showModals, setShowModals] = useRecoilState(showModalsState);

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
              src={
                variant === 'leaderboard'
                  ? `/assets/starIcon.svg`
                  : `/assets/yellowPokeball.svg`
              }
              alt=""
              width={50}
              height={50}
              priority
            />
          </StyledWhiteBorder>
        </StyledModalHeader>
        {children}
      </StyledDialog>
    </StyledContainer>
  );
};

import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import '@reach/dialog/styles.css';
import {
  StyledContainer,
  StyledDialog,
  StyledModalHeader,
  StyledCloseBtn,
  StyledWhiteBorder,
} from './Modal.styled';
import { timerState } from '../../utils/globalState';
import { SubmitScore } from '../SubmitScore/SubmitScore';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import { GameOver } from '../GameOver/GameOver';

interface ModalProps {
  showDialog: boolean;
  closeModal: () => void;
  variant: 'submitScore' | 'leaderboard';
  setShowDialog: (param: boolean) => void;
}

export const Modal = ({
  showDialog,
  closeModal,
  variant,
  setShowDialog,
}: ModalProps) => {
  const timer = useRecoilValue(timerState);
  console.log('showDialog', showDialog);

  useEffect(() => {
    if (timer === 0) {
      setShowDialog(true);
    }
  }, [timer, setShowDialog]);

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
        {/* <SubmitScore /> */}
        <GameOver />
        {/* <Leaderboard /> */}
      </StyledDialog>
    </StyledContainer>
  );
};

import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';
import { timerState, showModalsState } from '../../utils/globalState';
import { StyledWrapper } from './Layout.styled';
import { Navigation } from '../Navigation/Navigation';
import { Modal } from '../Modal/Modal';
import { GameOver } from '../GameOver/GameOver';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [timer, setTimer] = useRecoilState(timerState);
  const [showModals, setShowModals] = useRecoilState(showModalsState);

  const close = () => {
    setShowModals({ ...showModals, gameOver: false });
  };

  if (timer === 0) {
    setShowModals({ ...showModals, gameOver: true });
    setTimer('Ended!');
  }

  return (
    <>
      <Image
        src={`/assets/desktopBg.png`}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
        priority
      />

      {showModals.gameOver && (
        <Modal
          showDialog={showModals.gameOver}
          closeModal={close}
          variant="leaderboard"
        >
          <GameOver />
        </Modal>
      )}

      <Navigation />
      <StyledWrapper>{children}</StyledWrapper>
    </>
  );
};

import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useWindowSize } from '../../hooks/useWindowSize';
import { timerState, showModalsState, leaderboardState } from '../../recoil';
import { StyledWrapper } from './Layout.styled';
import { Navigation } from '../Navigation/Navigation';
import { Modal } from '../Modal/Modal';
import { GameOver } from '../Modal/GameOver/GameOver';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [timer, setTimer] = useRecoilState(timerState);
  const [showModals, setShowModals] = useRecoilState(showModalsState);
  const [leaderboard, setLeaderboard] = useRecoilState(leaderboardState);
  const size = useWindowSize();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('/api/leaderboard');

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        if (leaderboard.length === 0) {
          setLeaderboard(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLeaderboardData();
  }, [leaderboard, setLeaderboard]);

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
        src={`/assets/${
          size.width !== undefined && size.width <= 970
            ? 'mobileBg'
            : 'desktopBg'
        }.png`}
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
          variant="gameOver"
        >
          <GameOver />
        </Modal>
      )}

      <Navigation />
      <StyledWrapper>{children}</StyledWrapper>
    </>
  );
};

import type { NextPage } from 'next';
import { useEffect, useState, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import startGame from '../public/sounds/startGame.mp3';
import { chosenGenState } from '../utils/globalState';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const StyledContainer = styled.div`
  position: relative;
  width: 58vw;

  @media (max-width: 1337px) {
    width: 50vw;
  }

  @media (max-width: 1045px) {
    width: 100%;
  }
`;

const StyledIntro = styled.div`
  position: relative;
  text-align: center;
  padding: 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4rem);

  * {
    margin-bottom: 2rem;
  }
`;

const StyledStartGame = styled.a`
  text-decoration: none;
  font-family: ${theme.fonts.pressStart};
  padding: 1.5rem 2.5rem;
  background: ${theme.colors.supernova};
  border: 2px solid #3664ae;
  box-shadow: 0px 4px 0px ${theme.colors.midBlue};
  border-radius: 6px;
  text-transform: uppercase;
  color: ${theme.colors.midBlue};
`;

const Home: NextPage = () => {
  const [startGameAudio, setStartGameAudio] = useState<HTMLAudioElement>();
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);

  useEffect(() => {
    setStartGameAudio(new Audio(startGame));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChooseGen(e.target.value);
  };

  return (
    <StyledContainer>
      <StyledIntro>
        <h1>Who&apos;s that Pokemon?</h1>
        <p>
          It’s a race against the clock to correctly guess which one of the
          first generation 151 Pokemon is behind the mysterious dark silhouette!
        </p>
        <p>
          Earn a high score to enter the leaderboard and rank with the rest of
          the Pokemon Elites.
        </p>
        <p>Time starts once you click the start button!</p>

        <label htmlFor="generation">Choose your generation:</label>

        <select name="generation" id="generation" onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="all">All</option>
        </select>
        <Link href="/game" passHref>
          <StyledStartGame onClick={() => startGameAudio?.play()}>
            Start
          </StyledStartGame>
        </Link>
      </StyledIntro>
    </StyledContainer>
  );
};

export default Home;

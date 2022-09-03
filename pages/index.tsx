import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, ChangeEvent } from 'react';
import { useApi } from '../utils/hooks/useApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import Link from 'next/link';
import startGame from '../public/sounds/startGame.mp3';
import {
  chosenGenState,
  startGameAudioStaate,
  allPokemonState,
} from '../utils/globalState';
import styled from 'styled-components';
import { Button } from '../components/Button/Button';
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

const StyledH1 = styled.h1`
  display: flex;
`;

const StyledIntro = styled.div`
  position: relative;
  text-align: center;
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4rem);

  *:not(:first-child) {
    margin-bottom: 2rem;
  }

  label {
    text-transform: uppercase;
    font-family: ${theme.fonts.pressStart};
    font-size: 1.5rem;
  }
`;

const Home: NextPage = () => {
  const [startGameAudio, setStartGameAudio] =
    useRecoilState(startGameAudioStaate);
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);
  const dynamicRoute = useRouter().asPath;
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);

  useApi(
    chosenGen === 'all'
      ? 'https://pokeapi.co/api/v2/pokemon?limit=251'
      : `https://pokeapi.co/api/v2/generation/${chosenGen}`
  );

  useEffect(() => {
    setStartGameAudio(new Audio(startGame));

    // Reset Gen to 1 on dynamic route change.
    setChooseGen(1);
  }, [setStartGameAudio, dynamicRoute, setChooseGen]);

  useEffect(() => {
    if (dynamicRoute === '/') {
      setallPokemon([]);
    }
  }, [dynamicRoute, setallPokemon]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChooseGen(e.target.value);

    if (chosenGen !== e.target.value) {
      setallPokemon([]);
    }
  };

  return (
    <StyledContainer>
      <StyledIntro>
        <StyledH1>
          <Image
            src={'/assets/pokemonTitleDesktop.svg'}
            width={650}
            height={100}
            priority={true}
            draggable="false"
            alt="Who's that Pokemon?"
          />
        </StyledH1>

        <p>
          It’s a race against the clock to correctly guess which Pokemon is
          behind the mysterious dark silhouette!
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
          <option value="all">All</option>
        </select>

        <Button
          variant="cta"
          label="Start"
          href="/game"
          playSound={() => {
            startGameAudio?.play();
          }}
        />
      </StyledIntro>
    </StyledContainer>
  );
};

export default Home;

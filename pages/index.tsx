import type { NextPage } from 'next';
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

const Home: NextPage = () => {
  const [startGameAudio, setStartGameAudio] =
    useRecoilState(startGameAudioStaate);
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);
  const dynamicRoute = useRouter().asPath;
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);

  useApi(`https://pokeapi.co/api/v2/generation/${chosenGen}`);

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

  console.log(allPokemon);

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
        <Button kind="cta" label="Start" href="/game" />
        {/* <StyledStartGame
          // onClick={() => {
          //   startGameAudio?.play();
          // }}
          >
            Start
          </StyledStartGame> */}
      </StyledIntro>
    </StyledContainer>
  );
};

export default Home;

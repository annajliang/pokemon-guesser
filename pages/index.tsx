import type { NextPage } from 'next';
import clientPromise from '../lib/mongodb';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import startGame from '../public/sounds/startGame.mp3';
import {
  chosenGenState,
  startGameAudioState,
  allPokemonState,
  timerState,
  scoreState,
} from '../recoil';
import styled from 'styled-components';
import { BlockLink } from '../components/BlockLink/BlockLink';
import { theme } from '../styles/theme';
import { Dropdown } from '../components/Dropdown/Dropdown';

const StyledContainer = styled.div`
  position: relative;
  width: 58vw;

  @media (max-width: 970px) {
    width: 100%;
  }
`;

const StyledH1 = styled.h1`
  margin-bottom: 1rem;
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
`;

const StyledDivider = styled.div`
  border: 0.5px solid ${theme.colors.midBlue};
  width: 80%;
`;

const Home: NextPage = () => {
  const [startGameAudio, setStartGameAudio] =
    useRecoilState(startGameAudioState);
  const chosenGen = useRecoilValue(chosenGenState);
  const resetGen = useResetRecoilState(chosenGenState);
  const dynamicRoute = useRouter().asPath;
  const resetAllPokemon = useResetRecoilState(allPokemonState);
  const resetTimer = useResetRecoilState(timerState);
  const resetScore = useResetRecoilState(scoreState);

  useApi(
    chosenGen === 'all'
      ? 'https://pokeapi.co/api/v2/pokemon?limit=251'
      : `https://pokeapi.co/api/v2/generation/${chosenGen}`
  );

  useEffect(() => {
    // Reset pokemon gen, all pokemon, timer and audio on base route change
    if (dynamicRoute === '/') {
      setStartGameAudio(new Audio(startGame));
      resetAllPokemon();
      resetGen();
      resetTimer();
      resetScore();
    }
  }, [
    resetAllPokemon,
    setStartGameAudio,
    dynamicRoute,
    resetGen,
    resetTimer,
    resetScore,
  ]);

  return (
    <StyledContainer>
      <StyledIntro>
        <StyledH1>Who&apos;s That Pokémon?</StyledH1>

        <p>
          It’s a race against the clock to correctly guess which Pokemon is
          behind the mysterious dark silhouette!
        </p>
        <p>
          Earn a high score to enter the leaderboard and rank with the rest of
          the Pokemon Elites.
        </p>
        <p>Time starts once you click the start button!</p>

        <StyledDivider />

        <label htmlFor="generation">Choose your generation:</label>
        <Dropdown />
        <BlockLink
          label="Start"
          href="/game"
          onClick={() => {
            startGameAudio?.play();
          }}
        />
      </StyledIntro>
    </StyledContainer>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    console.log('You are connected to MongoDB');
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

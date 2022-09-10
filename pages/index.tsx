import type { NextPage } from 'next';
import Image from 'next/image';
import clientPromise from '../lib/mongodb';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import startGame from '../public/sounds/startGame.mp3';
import {
  chosenGenState,
  startGameAudioState,
  allPokemonState,
  timerState,
} from '../recoil';
import styled from 'styled-components';
import { BlockLink } from '../components/BlockLink/BlockLink';
import { theme } from '../styles/theme';
import { Dropdown } from '../components/Dropdown/Dropdown';

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

const StyledDivider = styled.div`
  border: 0.5px solid ${theme.colors.midBlue};
  width: 80%;
`;

const Home: NextPage = () => {
  const [startGameAudio, setStartGameAudio] =
    useRecoilState(startGameAudioState);
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);
  const dynamicRoute = useRouter().asPath;
  const setallPokemon = useSetRecoilState(allPokemonState);
  const setTimer = useSetRecoilState(timerState);

  useApi(
    chosenGen === 'all'
      ? 'https://pokeapi.co/api/v2/pokemon?limit=251'
      : `https://pokeapi.co/api/v2/generation/${chosenGen}`
  );

  useEffect(() => {
    setStartGameAudio(new Audio(startGame));

    // Reset Gen to 1 on dynamic route change.
    setChooseGen(1);
    // Reset timer to 60s on dynamic route change.
    setTimer(60);
  }, [setStartGameAudio, dynamicRoute, setChooseGen, setTimer]);

  useEffect(() => {
    if (dynamicRoute === '/') {
      setallPokemon([]);
    }
  }, [dynamicRoute, setallPokemon]);

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

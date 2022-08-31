import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, ChangeEvent } from 'react';
import { useApi } from '../utils/hooks/useApi';
import { useRecoilState, useRecoilValue } from 'recoil';
import Link from 'next/link';
import startGame from '../public/sounds/startGame.mp3';
import {
  chosenGenState,
  startGameAudioStaate,
  allPokemonState,
  unseenIdsState,
} from '../utils/globalState';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { PokemonData } from '../utils/types/interfaces';

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

interface IndexProps {
  pokemon_species: PokemonData[];
}

const Home = ({ pokemon_species }: IndexProps) => {
  const [startGameAudio, setStartGameAudio] =
    useRecoilState(startGameAudioStaate);
  const [chosenGen, setChooseGen] = useRecoilState(chosenGenState);
  const [allPokemon, setallPokemon] = useRecoilState(allPokemonState);
  const dynamicRoute = useRouter().asPath;
  const [unseenIds, setUnseenIds] = useRecoilState(unseenIdsState);

  const getPokemonId = (url: PokemonData['url']) => {
    const id = url?.split('/')[6];

    if (!id) {
      return;
    }

    if (parseInt(id) <= 9) {
      return '00' + id;
    }

    if (parseInt(id) >= 10 && parseInt(id) < 100) {
      return '0' + id;
    }

    return id;
  };

  const getReformattedName = (name: string) => {
    if (name === 'nidoran-f' || name === 'nidoran-m') {
      return 'Nidoran';
    }

    if (name === 'farfetchd') {
      return `Farfetch'd`;
    }

    if (name === 'mr-mime') {
      return 'Mr. Mime';
    }

    // capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getPokemonNameId = (results: PokemonData[]) => {
    return results.map((result: PokemonData) => {
      return {
        name: getReformattedName(result.name),
        id: getPokemonId(result.url),
        gen: result.url && parseInt(result.url.split('/')[6]) <= 151 ? 1 : 2,
      };
    });
  };

  const getPokemonIds = (results: PokemonData[]) => {
    return results.map((result: PokemonData, i) => {
      return i;
    });
  };

  useEffect(() => {
    if (pokemon_species) {
      const pokemonNameId = getPokemonNameId(pokemon_species);
      setallPokemon([...pokemonNameId]);
      const pokemonIds = getPokemonIds(pokemon_species);
      setUnseenIds([...pokemonIds]);
    }
  }, []);

  // useApi(`https://pokeapi.co/api/v2/generation/${chosenGen}`);

  useEffect(() => {
    setStartGameAudio(new Audio(startGame));

    // Reset Gen to 1 on dynamic route change.
    setChooseGen(1);
  }, [setStartGameAudio, dynamicRoute, setChooseGen]);

  // Reset Gen to 1 on dynamic route change.
  // useEffect(() => {
  //   setChooseGen(1);
  // }, [dynamicRoute, setChooseGen]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChooseGen(e.target.value);
  };

  // console.log('allPokemon', allPokemon);
  console.log('chosenGen', chosenGen);

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
          <StyledStartGame
          // onClick={() => {
          //   startGameAudio?.play();
          // }}
          >
            Start
          </StyledStartGame>
        </Link>
      </StyledIntro>
    </StyledContainer>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/generation/1`);
  const data = await res.json();

  const { pokemon_species } = data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pokemon_species }, // will be passed to the page component as props
  };
}

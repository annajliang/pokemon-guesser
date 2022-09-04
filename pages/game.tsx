import type { NextPage } from 'next';
import { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  showPokemonState,
  startGameAudioStaate,
  allPokemonState,
} from '../utils/globalState';
import { Pokemon } from '../components/Pokemon/Pokemon';
import { Form } from '../components/Form/Form';
import { Timer } from '../components/Timer/Timer';
import { Score } from '../components/Score/Score';
import { theme } from '../styles/theme';
import { useState } from 'react';
import Link from 'next/link';

const StyledStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: absolute;
  top: 20%;
  right: 0;
  transform: translate(-25%, 0);

  > *:not(:first-child) {
    margin-top: 4rem;
  }
`;

export const StyledContainer = styled.div`
  position: relative;
  width: 58vw;
  text-align: center;
  height: 96vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1337px) {
    width: 50vw;
  }

  @media (max-width: 1045px) {
    width: 100%;
  }
`;

const StyledSoundIcon = styled.button`
  background-color: ${theme.colors.supernova};
  border: 2px solid ${theme.colors.midBlue};
  padding: 10px;
  border-radius: 50%;
  display: flex;
  box-shadow: 4px 4px 0px ${theme.colors.midBlue};
`;

const StyledErrorContainer = styled.div`
  width: 500px;
`;

const StyledErrorMessage = styled.p`
  margin: 1rem 0 2rem 0;
  font-size: 1.5rem;
`;

const Game: NextPage = () => {
  const showPokemon = useRecoilValue(showPokemonState);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [startGameAudio, setStartGameAudio] =
    useRecoilState(startGameAudioStaate);
  const allPokemon = useRecoilValue(allPokemonState);

  return (
    <>
      <StyledContainer>
        {allPokemon.length > 0 ? (
          <>
            <div>
              <StyledStatus>
                <StyledSoundIcon
                  onClick={() => {
                    startGameAudio?.pause();
                    setIsSoundOn((isSoundOn) => !isSoundOn);
                  }}
                >
                  <Image
                    src={`/assets/${isSoundOn ? 'soundOn' : 'soundOff'}.svg`}
                    alt=""
                    width={40}
                    height={40}
                    priority
                  />
                </StyledSoundIcon>
                <Timer />
                <Score />
              </StyledStatus>
            </div>
            <Pokemon />
            <Form isSoundOn={isSoundOn} />
          </>
        ) : (
          <StyledErrorContainer>
            {<h1>Error Occurred!</h1>}
            <StyledErrorMessage>
              Uh-oh! Looks like you were trying to play the game without
              selecting a Pokémon generation first. Please go{' '}
              <Link href="/">back to the homepage</Link> and pick your
              generation before you play.
            </StyledErrorMessage>
          </StyledErrorContainer>
        )}
      </StyledContainer>
    </>
  );
};

export default Game;

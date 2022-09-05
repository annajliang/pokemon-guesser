import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { startGameAudioState, allPokemonState } from '../recoil';
import { Pokemon } from '../components/Pokemon/Pokemon';
import { Form } from '../components/Form/Form';
import { Timer } from '../components/Timer/Timer';
import { Score } from '../components/Score/Score';
import { Error } from '../components/Error/Error';
import { theme } from '../styles/theme';
import { useState } from 'react';

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

const Game: NextPage = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const startGameAudio = useRecoilValue(startGameAudioState);
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
          <Error />
        )}
      </StyledContainer>
    </>
  );
};

export default Game;

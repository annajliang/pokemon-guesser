import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { showPokemonState } from '../utils/globalState';
import { useApi } from '../utils/hooks/useApi';
import { Pokemon } from '../components/Pokemon/Pokemon';
import { Form } from '../components/Form/Form';
import { Timer } from '../components/Timer/Timer';
import { Score } from '../components/Score/Score';
import { theme } from '../styles/theme';

const StyledStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: absolute;
  top: 25%;
  right: 0;
  transform: translate(-25%, 0);
`;

export const StyledContainer = styled.div`
  position: relative;
  width: 58vw;
  text-align: center;
  height: 100vh;

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

const Game: NextPage = () => {
  const showPokemon = useRecoilValue(showPokemonState);

  useApi('https://pokeapi.co/api/v2/pokemon?limit=5');

  return (
    <StyledContainer>
      <div>
        {!showPokemon && <h1>Who&apos;s that Pokemon?</h1>}
        <StyledStatus>
          <Timer />
          <Score />
        </StyledStatus>
      </div>
      <Pokemon />
      <Form />
    </StyledContainer>
  );
};

export default Game;

import type { NextPage } from 'next';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { allPokemonState, currentIndexState } from '../recoil';
import { Pokemon } from '../components/Pokemon/Pokemon';
import { Form } from '../components/Form/Form';
import { Error } from '../components/Error/Error';
import { MobileStatus } from '../components/Status/MobileStatus';
import { Status } from '../components/Status/Status';

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
  }

  @media (max-width: 1130px) {
    margin-left: 1rem;
    width: 65vw;
  }

  @media (max-width: 970px) {
    width: 100vw;
  }
`;

const Game: NextPage = () => {
  const allPokemon = useRecoilValue(allPokemonState);
  const currentIndex = useRecoilValue(currentIndexState);

  return (
    <>
      <StyledContainer>
        {allPokemon.length > 0 ? (
          <>
            <Status />
            <Pokemon />
            <MobileStatus />
            <Form />
          </>
        ) : (
          <Error />
        )}
      </StyledContainer>
    </>
  );
};

export default Game;

import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledPokemonImage = styled.div<{
  showPokemon: boolean;
}>`
  margin: ${theme.spacing.l} 0;

  img {
    filter: ${({ showPokemon }) => (showPokemon ? 'none' : 'brightness(0)')};
    position: relative;
    left: 3rem;
    margin: 4rem 0;
    object-fit: contain;
    height: 400px;

    @media (max-width: 1337px) {
      height: 350px;
    }

    @media (max-width: 1045px) {
      width: 250px;
      left: auto;
      margin: 3rem 0 5rem 0;
      height: auto;
    }
  }
`;

export const StyledName = styled.h1<{ isGuessCorrect: boolean | null }>`
  /* color: ${({ isGuessCorrect }) => (isGuessCorrect ? 'green' : 'red')}; */
  -webkit-text-stroke-color: ${({ isGuessCorrect }) =>
    isGuessCorrect ? 'green' : 'red'};
`;

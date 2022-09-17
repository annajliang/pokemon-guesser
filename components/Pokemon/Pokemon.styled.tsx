import styled, { css } from 'styled-components';
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

    ${({ showPokemon }) =>
      !showPokemon &&
      css`
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.5s;
      `}

    @media (max-width: 1337px) {
      height: 350px;
    }

    @media (max-width: 1045px) {
      width: 250px;
      left: auto;
      margin: 3rem 0 5rem 0;
      height: auto;
    }

    @media (max-width: 970px) {
      width: 300px !important;
    }
  }
`;

export const StyledName = styled.h1<{ isGuessCorrect: boolean | null }>`
  -webkit-text-stroke-color: ${({ isGuessCorrect }) =>
    isGuessCorrect ? 'green' : 'red'};
  height: 70px;
`;

export const StyledImageDesktop = styled.div`
  margin: 0 2rem;
`;

export const StyledPicture = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
`;

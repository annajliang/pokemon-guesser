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
  }
`;

export const StyledName = styled.h1<{ isGuessCorrect: boolean | null }>`
  -webkit-text-stroke-color: ${({ isGuessCorrect }) =>
    isGuessCorrect ? 'green' : 'red'};

  @media (max-width: 532px) {
    height: 104px;
    display: flex;
    align-items: center;
  }
`;

export const StyledPicture = styled.picture`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledH1 = styled.h1`
  @media (max-width: 600px) {
    margin: 0 2rem;
  }
`;

export const StyledNextPokemon = styled.div`
  position: absolute;
  visibility: hidden;
`;

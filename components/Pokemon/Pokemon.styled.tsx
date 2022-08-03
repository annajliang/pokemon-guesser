import styled from 'styled-components';

export const StyledPokemonImage = styled.div<{ showPokemon: boolean }>`
  img {
    filter: ${({ showPokemon }) => (showPokemon ? 'none' : 'brightness(0)')};
  }
`;

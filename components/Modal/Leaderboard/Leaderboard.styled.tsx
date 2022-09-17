import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StyledRanking = styled.ol`
  padding: 0 5rem;

  @media (max-width: 435px) {
    padding: 1rem 4rem;
  }
`;

export const StyledText = styled.p`
  padding: 1rem 9rem 2rem;
  font-family: ${theme.fonts.sen};
  font-size: 2rem;
  color: ${theme.colors.gunsmoke};
`;

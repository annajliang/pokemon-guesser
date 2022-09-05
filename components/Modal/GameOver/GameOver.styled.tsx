import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledScore = styled.div`
  background-color: ${theme.colors.eggshell};
  padding: 1rem;
  width: 28rem;
  margin-bottom: ${theme.spacing.l};

  span {
    font-family: ${theme.fonts.sen};
    color: ${theme.colors.gunsmoke};
  }
`;

export const StyledText = styled.p`
  padding: 1rem 9rem 2rem;
  font-family: ${theme.fonts.sen};
  font-size: 2rem;
  color: ${theme.colors.gunsmoke};
`;

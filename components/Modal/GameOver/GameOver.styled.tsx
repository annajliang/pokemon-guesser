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

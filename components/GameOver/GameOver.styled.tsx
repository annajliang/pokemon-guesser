import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLabel = styled.label`
  font-family: ${theme.fonts.sen};
  font-weight: 700;
  color: ${theme.colors.gunsmoke};
  position: relative;
  padding-bottom: 1rem;

  :after,
  :before {
    content: '';
    width: 69px;
    border-bottom: solid 2px ${theme.colors.cloud};
    position: absolute;
    top: 40%;
    z-index: 1;
  }

  :after {
    left: 12rem;
  }

  :before {
    right: 12rem;
  }
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

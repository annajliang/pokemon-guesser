import styled from 'styled-components';
import { theme } from '../../../styles/theme';

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

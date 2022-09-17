import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledSound = styled.button`
  color: ${theme.colors.midBlue};
  font-family: ${theme.fonts.pressStart};
  text-transform: uppercase;
  font-size: 1.3rem;
  letter-spacing: 1px;
  padding: 0;
  display: flex;
  align-items: center;
  border: none;
  background: none;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const StyledSoundIcon = styled.div`
  margin: 0 5px;
  align-items: center;
`;

import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledButton = styled.button`
  background-color: ${theme.colors.supernova};
  font-family: ${theme.fonts.pressStart};
  font-size: 1.5rem;
  padding: 1.5rem 2rem;
  box-shadow: 0px 4px 0px 0px ${theme.colors.midBlue};
  border-radius: 0 6px 6px 0;
  border: 2px solid ${theme.colors.midBlue};
  text-transform: uppercase;
  position: relative;
  right: 0;
  color: inherit;
  border-left: 0;

  @media (max-width: 1045px) {
    position: absolute;
    right: 0;
    font-size: 12px;
    padding: 1.5rem 1rem;
    border-left: 2px solid ${theme.colors.midBlue};
  }
`;

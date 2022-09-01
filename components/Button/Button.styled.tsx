import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledButton = styled.button<{ kind: string; size: string }>`
  text-decoration: none;
  font-family: ${theme.fonts.pressStart};
  padding: 1.5rem 2.5rem;
  background: ${theme.colors.supernova};
  border: 2px solid #3664ae;
  box-shadow: 0px 4px 0px ${theme.colors.midBlue};
  border-radius: 6px;
  text-transform: uppercase;
  color: ${theme.colors.midBlue};
  font-size: 1.5rem;

  ${({ size }) =>
    size === 'large' &&
    css`
      padding: 1.5rem 2rem;
      box-shadow: 0px 4px 0px 0px ${theme.colors.midBlue};
      border-radius: 0 6px 6px 0;
      border: 2px solid ${theme.colors.midBlue};
      position: relative;
      right: 0;
      border-left: 0;

      @media (max-width: 1045px) {
        position: absolute;
        right: 0;
        font-size: 12px;
        padding: 1.5rem 1rem;
        border-left: 2px solid ${theme.colors.midBlue};
      }
    `}
`;

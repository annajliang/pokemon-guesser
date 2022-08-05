import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledTimer = styled.div<{
  counter?: string | number | undefined;
}>`
  background-color: ${theme.colors.white};
  box-shadow: 4px 4px 0px rgba(54, 100, 174, 0.3);
  border-radius: 5px;
  padding: 0.8rem;
  font-family: ${theme.fonts.pressStart};
  position: relative;
  font-size: 1.3rem;
  width: 132px;
  text-align: right;
  animation: ${({ counter }) =>
    counter !== undefined && counter <= 10 && counter !== 0
      ? 'pulse 1s ease infinite'
      : 'none'};

  h3 {
    position: absolute;
    bottom: 3.5rem;
    right: 0;
    text-transform: uppercase;
  }

  p {
    font-family: ${theme.fonts.pressStart};
    color: ${({ counter }) =>
      (counter !== undefined && counter <= 10 && counter !== 0) ||
      counter === 'Paused'
        ? 'red'
        : 'inherit'};
  }
`;

export const StyledClockIcon = styled.span`
  position: absolute;
  top: 50%;
  left: -1rem;
  transform: translate(0, -50%);
  background-color: ${theme.colors.supernova};
  padding: 7px;
  border-radius: 50%;
  width: 50px;
`;

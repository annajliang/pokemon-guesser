import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledScore = styled.div`
  background-color: ${theme.colors.white};
  box-shadow: 4px 4px 0px rgba(54, 100, 174, 0.3);
  border-radius: 5px;
  padding: 0.8rem;
  font-family: ${theme.fonts.pressStart};
  position: relative;
  font-size: 1.3rem;
  width: 132px;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  h3 {
    position: absolute;
    bottom: 3.5rem;
    right: 0;
    text-transform: uppercase;

    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }

  p {
    font-family: ${theme.fonts.pressStart};
  }

  @media (max-width: 1045px) {
    margin-top: 0;
    margin-left: 3rem;
  }

  @media (max-width: 420px) {
    width: 100px;
  }
`;

export const StyledAddedPoints = styled.p`
  position: absolute;
  right: -3.5rem;
  bottom: 0;
  animation-name: fade-in-up;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
`;

export const StyledScoreIcon = styled.span`
  position: absolute;
  top: 50%;
  left: -1rem;
  transform: translate(0, -50%);
  background-color: ${theme.colors.supernova};
  padding: 7px;
  border-radius: 50%;
  width: 50px;
  display: flex;

  @media (max-width: 420px) {
    width: 45px;
  }
`;

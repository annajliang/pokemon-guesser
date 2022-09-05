import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledForm = styled.form<{
  isGuessCorrect: boolean | null | undefined;
}>`
  border-radius: 6px 0 6px 6px;
  display: flex;
  animation: ${({ isGuessCorrect }) =>
    isGuessCorrect === false && 'shake 0.5s'};
`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: 1045px) {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    margin: 1rem 0;
  }

  @media (max-width: 580px) {
    margin: 1rem 6rem;
  }

  @media (max-width: 420px) {
    margin: 1rem 2rem;
  }
`;

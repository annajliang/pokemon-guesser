import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledForm = styled.form<{
  isGuessCorrect: boolean | null | undefined;
}>`
  border-radius: 6px 0 6px 6px;
  display: flex;
  animation: ${({ isGuessCorrect }) =>
    isGuessCorrect === false && 'shake 0.5s'};

  @media (max-width: 1045px) {
    width: 100%;
  }
`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: 1045px) {
    width: 70%;
  }

  @media (max-width: 420px) {
    width: 90%;
  }
`;

export const StyledSettings = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.s};
`;

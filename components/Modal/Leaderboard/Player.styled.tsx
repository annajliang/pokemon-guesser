import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StyledPlayer = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: 700;
  font-size: 1.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  p {
    padding-bottom: 0;
    font-family: ${theme.fonts.sen};
    font-size: 2rem;
  }

  div {
    display: flex;

    p:first-child {
      margin-right: 40px;
      color: ${theme.colors.heavyMetal};
      width: 20px;
    }

    p:last-child {
      color: ${theme.colors.heavyMetal};
    }
  }
`;

export const StyledScore = styled.p`
  color: ${theme.colors.rubyRed};
`;

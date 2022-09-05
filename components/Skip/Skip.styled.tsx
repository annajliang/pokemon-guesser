import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  bottom: 6rem;
  left: 0;
  display: flex;

  @media (max-width: 1045px) {
    position: relative;
    bottom: auto;
    left: auto;
    margin-bottom: 0.5rem;
  }
`;

export const StyledSkipBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-family: ${theme.fonts.pressStart};
  color: inherit;
  text-transform: uppercase;
  font-size: 1.3rem;
  letter-spacing: 1px;
  padding: 0;
  margin-bottom: ${theme.spacing.s};
`;

export const StyledSkipIcon = styled.div`
  margin-right: 5px;
`;

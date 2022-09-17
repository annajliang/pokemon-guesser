import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  bottom: 6rem;
  left: 0;
  display: flex;
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

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const StyledSkipIcon = styled.div`
  margin-right: 5px;
`;

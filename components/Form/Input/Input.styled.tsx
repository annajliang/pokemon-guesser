import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StyledInput = styled.input`
  border: 2px solid ${theme.colors.midBlue};
  padding: 1.5rem 1rem;
  width: auto;
  font-family: ${theme.fonts.pressStart};
  font-size: 1.5rem;
  box-shadow: 0px 4px 0px 0px ${theme.colors.midBlue};
  color: inherit;

  ::placeholder {
    color: ${theme.colors.midBlue};
  }

  @media (max-width: 1045px) {
    font-size: 1.5rem;
    width: 100%;
  }

  @media (max-width: 500px) {
    font-size: 1.3rem;
  }

  @media (max-width: 420px) {
    font-size: 1rem;
  }
`;

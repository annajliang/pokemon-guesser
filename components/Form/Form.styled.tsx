import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledForm = styled.form`
  border-radius: 6px 0 6px 6px;
  display: flex;
`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  /* position: absolute;
  right: 50%;
  transform: translate(50%, 0); */

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

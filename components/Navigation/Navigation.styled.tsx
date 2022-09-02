import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledNav = styled.nav`
  height: 5rem;
  background-color: ${theme.colors.midBlue};
  position: absolute;
  top: 0;
  z-index: 3;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
`;

import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledNav = styled.nav`
  height: 4.5rem;
  background-color: ${theme.colors.midBlue};
  position: absolute;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
`;

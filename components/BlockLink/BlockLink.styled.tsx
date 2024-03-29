import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledBlockLink = styled.a`
  text-decoration: none;
  padding: 1.5rem 2.5rem;
  background: ${theme.colors.supernova};
  border: 2px solid #3664ae;
  box-shadow: 0px 4px 0px ${theme.colors.midBlue};
  border-radius: 6px;
  text-transform: uppercase;
`;

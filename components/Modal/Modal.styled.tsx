import { Dialog } from '@reach/dialog';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

export const StyledDialog = styled(Dialog)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 640px;
  padding-bottom: 4rem;

  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  text-align: center;
`;

export const StyledModalHeader = styled.div`
  position: relative;
  width: 640px;
  height: 69px;
  left: 0;
  top: 0;
  margin-bottom: 5rem;

  background: ${theme.colors.supernova};
  border-radius: 15px 15px 0px 0px;
  text-align: center;

  @media (max-width: 685px) {
    width: 100%;
  }
`;

export const StyledWhiteBorder = styled.div`
  background-color: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: 50%;
  position: absolute;
  top: 6.7rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledCloseBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;
  background: none;
  border: none;
`;

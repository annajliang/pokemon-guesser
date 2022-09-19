import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const StyledPlayerInput = styled.input`
  background-color: ${theme.colors.eggshell};
  font-family: ${theme.fonts.sen};
  color: ${theme.colors.gunsmoke};
  border: none;
  width: 271px;
  height: 51px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

export const StyledSubmitStatus = styled.p`
  text-transform: uppercase;
  color: ${theme.colors.rubyRed};
  padding-bottom: 0;
`;

export const StyledToolTip = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  background-color: ${theme.colors.dawnPink};
  border: 2px solid ${theme.colors.chiliPepper};
  padding: 0.9rem;
  position: absolute;
  text-align: center;
  transition: all 0.2s ease;
  bottom: 3rem;
  box-shadow: 5px 5px 5px 0 rgb(0 0 0 / 20%);

  p {
    padding-left: 5px;
    font-family: ${theme.fonts.sen};
    color: ${theme.colors.heavyMetal};
    font-size: 1.4rem;
  }

  &::before,
  &::after {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    content: '';
    height: 0;
    left: 10%;
    position: absolute;
    top: -10px;
    width: 0;
  }

  &::after {
    border-bottom: 11px solid ${theme.colors.dawnPink};
    margin-left: 6px;
    margin-top: 0;
  }

  &::before {
    border-bottom: 13px solid ${theme.colors.chiliPepper};
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-top-width: 13px;
    margin-left: 3px;
    margin-top: -4px;
    top: -9px;
  }
`;

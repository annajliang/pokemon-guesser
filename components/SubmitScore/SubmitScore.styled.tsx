import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledText = styled.p`
  padding: 1rem 9rem 2rem;
  font-family: ${theme.fonts.sen};
  font-size: 2rem;
  color: ${theme.colors.gunsmoke};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #ef3729;
    padding-bottom: 0;
  }
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

export const StyledLabel = styled.label`
  font-family: ${theme.fonts.sen};
  font-weight: 700;
  color: ${theme.colors.gunsmoke};
  position: relative;
  padding-bottom: 1rem;

  :after,
  :before {
    content: '';
    width: 69px;
    border-bottom: solid 2px ${theme.colors.cloud};
    position: absolute;
    top: 40%;
    z-index: 1;
  }

  :after {
    left: 12rem;
  }

  :before {
    right: 12rem;
  }
`;

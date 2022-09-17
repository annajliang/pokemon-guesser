import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledStatus = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 2rem;

  > *:not(:first-child) {
    margin-top: 4rem;

    @media (max-width: 700px) {
      margin-top: 3rem;
    }
  }

  @media (min-width: 971px) {
    display: none !important;
  }
`;

export const StyledSoundIcon = styled.button`
  background-color: ${theme.colors.supernova};
  border: 2px solid ${theme.colors.midBlue};
  padding: 10px;
  border-radius: 50%;
  display: flex;
  box-shadow: 4px 4px 0px ${theme.colors.midBlue};

  img {
    @media (max-width: 700px) {
      width: 30px !important;
    }

    @media (max-width: 500px) {
      width: 20px !important;
    }
  }
`;

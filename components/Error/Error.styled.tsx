import styled from 'styled-components';

export const StyledErrorContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    width: auto;
  }
`;

export const StyledErrorMessage = styled.p`
  margin: 1rem 3rem 2rem 3rem;
`;

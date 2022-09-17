import Link from 'next/link';
import { StyledErrorContainer, StyledErrorMessage } from './Error.styled';

export const Error = () => {
  return (
    <StyledErrorContainer>
      <h1>Error Occured!</h1>
      <StyledErrorMessage>
        Uh-oh! Looks like you were trying to play the game without selecting a
        Pokémon generation first. Please go{' '}
        <Link href="/">back to the homepage</Link> and pick your generation
        before you play.
      </StyledErrorMessage>
    </StyledErrorContainer>
  );
};

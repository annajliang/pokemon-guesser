import Link from 'next/link';
import Image from 'next/image';
import { StyledErrorContainer, StyledErrorMessage } from './Error.styled';

export const Error = () => {
  return (
    <StyledErrorContainer>
      <Image
        src={'/assets/errorTitle.svg'}
        width={650}
        height={100}
        priority={true}
        draggable="false"
        alt="Error Occurred!"
      />
      <StyledErrorMessage>
        Uh-oh! Looks like you were trying to play the game without selecting a
        Pokémon generation first. Please go{' '}
        <Link href="/">back to the homepage</Link> and pick your generation
        before you play.
      </StyledErrorMessage>
    </StyledErrorContainer>
  );
};

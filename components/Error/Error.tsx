import Link from 'next/link';
import { StyledErrorContainer, StyledErrorMessage } from './Error.styled';

export const Error = () => {
  return (
    <StyledErrorContainer>
      <h1>Error Occured!</h1>
      <StyledErrorMessage>
        Uh-oh! Looks like an error somehow occcured. Sorry about that! Please go{' '}
        <Link href="/">back to the homepage</Link>, pick your generation and try
        again.
      </StyledErrorMessage>
    </StyledErrorContainer>
  );
};

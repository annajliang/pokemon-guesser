import { StyledButton } from './Button.styled';
import Link from 'next/link';

type Size = 'small' | 'medium' | 'large';

type ButtonProps = {
  showPokemon?: boolean;
  kind?: 'primary' | 'cta';
  link?: boolean;
  label: string;
  size?: Size;
  href?: string;
};

export const Button = ({
  showPokemon,
  label,
  href,
  kind = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <>
      {kind === 'primary' ? (
        <StyledButton
          type="submit"
          disabled={showPokemon}
          kind={kind}
          size={size}
        >
          {label}
        </StyledButton>
      ) : (
        <Link href={`${href}`} passHref>
          <StyledButton kind={kind} size={size}>
            {label}
          </StyledButton>
        </Link>
      )}
    </>
  );
};

import { StyledButton } from './Button.styled';
import Link from 'next/link';

type Size = 'small' | 'medium' | 'large';

type ButtonProps = {
  showPokemon?: boolean;
  variant?: 'primary' | 'cta' | 'modal';
  link?: boolean;
  label: string;
  size?: Size;
  href?: string;
  playSound?: () => void;
  showModal?: () => void;
};

export const Button = ({
  showPokemon,
  label,
  href,
  playSound,
  showModal,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <>
      {/* TODO breaak tthis up intoo 3 buttons */}
      {variant === 'primary' && (
        <StyledButton
          type="submit"
          disabled={showPokemon}
          variant={variant}
          size={size}
        >
          {label}
        </StyledButton>
      )}
      {variant === 'modal' && (
        <StyledButton variant={variant} size={size} onClick={showModal}>
          {label}
        </StyledButton>
      )}
      {variant === 'cta' && (
        <Link href={`${href}`} passHref>
          <StyledButton variant={variant} size={size} onClick={playSound}>
            {label}
          </StyledButton>
        </Link>
      )}
    </>
  );
};

import { StyledButton } from './Button.styled';

interface ButtonProps {
  showPokemon: boolean;
}

export const Button = ({ showPokemon }: ButtonProps) => {
  return (
    <StyledButton type="submit" disabled={showPokemon}>
      Guess
    </StyledButton>
  );
};

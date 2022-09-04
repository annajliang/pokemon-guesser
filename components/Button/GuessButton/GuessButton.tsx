import { StyledButton } from '../Button.styled';
import { timerState } from '../../../utils/globalState';
import { useRecoilValue } from 'recoil';
import { ButtonProps } from '../Button';

interface GuessProps extends ButtonProps {
  showPokemon?: boolean;
}

export const Guess = ({
  showPokemon,
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
}: GuessProps) => {
  const timer = useRecoilValue(timerState);

  return (
    <>
      <StyledButton
        variant={variant}
        disabled={showPokemon || timer === 0}
        size={size}
        onClick={onClick}
      >
        {label}
      </StyledButton>
    </>
  );
};

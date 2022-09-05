import { StyledButton } from '../Button.styled';
import { timerState } from '../../../utils/globalState';
import { useRecoilValue } from 'recoil';
import { ButtonProps } from '../Button';

interface GuessProps extends ButtonProps {
  isDisabled?: boolean;
}

export const Guess = ({
  isDisabled,
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
        disabled={isDisabled || timer === 'Ended!'}
        size={size}
        onClick={onClick}
      >
        {label}
      </StyledButton>
    </>
  );
};

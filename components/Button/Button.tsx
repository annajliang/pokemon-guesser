import { StyledButton } from './Button.styled';
import { timerState } from '../../utils/globalState';
import { useRecoilValue } from 'recoil';

type Size = 'small' | 'medium' | 'large';

type ButtonProps = {
  showPokemon?: boolean;
  variant?: 'primary' | 'modal';
  label: string;
  size?: Size;
  onClick?: () => void;
};

export const Button = ({
  showPokemon,
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => {
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

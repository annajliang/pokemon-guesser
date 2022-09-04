import { StyledButton } from './Button.styled';

type Size = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: 'primary' | 'modal';
  label: string;
  size?: Size;
  onClick?: () => void;
}

export const Button = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <>
      <StyledButton variant={variant} size={size} onClick={onClick}>
        {label}
      </StyledButton>
    </>
  );
};

import { StyledButton } from './Button.styled';
import { SubmissionStatus } from '../../types';

type Size = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: 'primary' | 'modal';
  label: string;
  size?: Size;
  onClick?: () => void;
  submissionStatus?: SubmissionStatus;
}

export const Button = ({
  label,
  onClick,
  submissionStatus,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <>
      <StyledButton
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={submissionStatus === SubmissionStatus.SUCCESS}
      >
        {label}
      </StyledButton>
    </>
  );
};

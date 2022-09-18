import Image from 'next/image';
import { StyledSkipBtn, StyledSkipIcon } from './Skip.styled';
import { timerState } from '../../recoil';
import { useRecoilValue } from 'recoil';

interface SkipProps {
  handleSkip: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
}

export const Skip = ({ handleSkip, isDisabled }: SkipProps) => {
  const timer = useRecoilValue(timerState);

  return (
    <StyledSkipBtn
      onClick={handleSkip}
      disabled={isDisabled || timer === 'Ended!'}
    >
      <StyledSkipIcon>
        <Image
          src="/assets/skipPokeball.svg"
          alt=""
          width={25}
          height={25}
          priority
        />
      </StyledSkipIcon>
      Skip
    </StyledSkipBtn>
  );
};

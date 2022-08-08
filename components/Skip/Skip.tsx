import Image from 'next/image';
import { StyledContainer, StyledSkipBtn, StyledSkipIcon } from './Skip.styled';

interface SkipProps {
  handleSkip: React.MouseEventHandler<HTMLButtonElement>;
  showPokemon: boolean;
}

export const Skip = ({ handleSkip, showPokemon }: SkipProps) => {
  return (
    <StyledContainer>
      <StyledSkipBtn onClick={handleSkip} disabled={showPokemon}>
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
    </StyledContainer>
  );
};

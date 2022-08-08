import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import { scoreState, isGuessCorrectState } from '../../utils/globalState';
import {
  StyledScore,
  StyledScoreIcon,
  StyledAddedPoints,
} from './Score.styled';

export const Score = () => {
  const score = useRecoilValue(scoreState);
  const isGuessCorrect = useRecoilValue(isGuessCorrectState);

  return (
    <StyledScore>
      <StyledScoreIcon>
        <Image
          src="/assets/bluePokeball.svg"
          alt=""
          width={50}
          height={50}
          priority
        />
      </StyledScoreIcon>
      <h3>Score</h3>
      <p>{score}</p>
      {isGuessCorrect && <StyledAddedPoints>+5</StyledAddedPoints>}
    </StyledScore>
  );
};

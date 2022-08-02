import { useRecoilState, useRecoilValue } from 'recoil';
import { scoreState } from '../../utils/globalState';

export const Score = () => {
  const score = useRecoilValue(scoreState);

  return (
    <div>
      <h3>Score</h3>
      <span>{score}</span>
      {/* {isGuessCorrect && <StyledAddedPoints>+5</StyledAddedPoints>} */}
    </div>
  );
};

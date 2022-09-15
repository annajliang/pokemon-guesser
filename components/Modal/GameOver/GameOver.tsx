import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import {
  scoreState,
  showModalsState,
  timerState,
  leaderboardState,
} from '../../../recoil';
import { StyledContainer, StyledScore, StyledText } from './GameOver.styled';
import { SubmitScore } from '../SubmitScore/SubmitScore';
import { BlockLink } from '../../BlockLink/BlockLink';
import { Label } from '../../Form/Label/Label';

const FinalScore = ({ score }: { score: number }) => {
  const [showModals, setShowModals] = useRecoilState(showModalsState);
  const setTimer = useSetRecoilState(timerState);

  return (
    <StyledContainer>
      <Label label="Your Score" forValue="score" />
      <StyledScore>
        <span>{score}</span>
      </StyledScore>
      <BlockLink
        label="Replay"
        href="/"
        onClick={() => {
          setShowModals({ ...showModals, gameOver: false });
          setTimer(60);
        }}
      />
    </StyledContainer>
  );
};

export const GameOver = () => {
  const score = useRecoilValue(scoreState);
  const leaderboard = useRecoilValue(leaderboardState);
  const lowestScore = leaderboard[leaderboard.length - 1]?.score || 0;

  if (score > lowestScore || score > 0) {
    return <SubmitScore />;
  }

  return (
    <>
      <h2 id="modalHeading">Game Over</h2>
      <StyledText>
        Better brush up on your Pokémon knowledge and try again next time!
      </StyledText>
      <FinalScore score={score} />
    </>
  );
};

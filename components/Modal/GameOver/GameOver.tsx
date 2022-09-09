import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { scoreState, showModalsState, timerState } from '../../../recoil';
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

const GameOverMessage = ({ score }: { score: number }) => {
  if (score > 40) {
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

export const GameOver = () => {
  const score = useRecoilValue(scoreState);
  return <GameOverMessage score={score} />;
};

import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  scoreState,
  showDialogState,
  timerState,
} from '../../utils/globalState';
import {
  StyledContainer,
  StyledLabel,
  StyledScore,
  StyledText,
} from './GameOver.styled';
import { SubmitScore } from '../SubmitScore/SubmitScore';
import { BlockLink } from '../BlockLink/BlockLink';

const Score = ({ score }: { score: number }) => {
  const setShowDialog = useSetRecoilState(showDialogState);
  const setTimer = useSetRecoilState(timerState);

  return (
    <StyledContainer>
      <StyledLabel>Your Score</StyledLabel>
      <StyledScore>
        <span>{score}</span>
      </StyledScore>
      <BlockLink
        label="Replay"
        href="/"
        onClick={() => {
          setShowDialog(false);
          setTimer(60);
        }}
      />
    </StyledContainer>
  );
};

const GameOverMessage = ({ score }: { score: number }) => {
  if (score <= 20) {
    return (
      <>
        <h2>Oof!</h2>
        <StyledText>
          Better brush up on your Pokémon knowledge and try again when
          you&apos;re ready.
        </StyledText>
        <Score score={score} />
      </>
    );
  }

  if (score >= 25 && score <= 35) {
    return (
      <>
        <h2>You tried!</h2>
        <StyledText>
          There was an attempt... but c&apos;mon you can do better than that!
        </StyledText>
        <Score score={score} />
      </>
    );
  }

  // if (score >= 40) {
  //   return (
  //     <>
  //       <h2>Noice!</h2>
  //       <StyledText>
  //         Not bad, but not quite leaderboard material yet! Try again and
  //         you&apos;ll be there in no time!
  //       </StyledText>
  //     </>
  //   );
  // }

  if (score > 40) {
    return <SubmitScore />;
  }

  return <></>;
};

export const GameOver = () => {
  const score = useRecoilValue(scoreState);
  return <GameOverMessage score={score} />;
};

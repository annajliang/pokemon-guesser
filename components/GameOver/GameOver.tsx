import { useRecoilValue } from 'recoil';
import { scoreState } from '../../utils/globalState';
import {
  StyledContainer,
  StyledLabel,
  StyledScore,
  StyledText,
} from './GameOver.styled';
import { SubmitScore } from '../SubmitScore/SubmitScore';
import { Button } from '../Button/Button';

const Score = ({ score }: { score: number }) => {
  return (
    <StyledContainer>
      <StyledLabel>Your Score</StyledLabel>
      <StyledScore>
        <span>{score}</span>
      </StyledScore>
      <Button label="Replay" onClick={() => window.location.reload()} />
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

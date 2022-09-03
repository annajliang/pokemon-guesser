import { useRecoilValue } from 'recoil';
import { scoreState } from '../../utils/globalState';
import {
  StyledContainer,
  StyledLabel,
  ScoreContainer,
  StyledText,
} from './GameOver.styled';

const GameOverMessage = ({ score }: { score: number }) => {
  if (score <= 20) {
    return (
      <>
        <h2>Oof!</h2>
        <StyledText>
          Better brush up on your Pokémon knowledge and try again when
          you&apos;re ready.
        </StyledText>
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
      </>
    );
  }

  if (score >= 40) {
    return (
      <>
        <h2>Noice!</h2>
        <StyledText>
          Not bad, but not quite leaderboard material yet! Try again and
          you&apos;ll be there in no time!
        </StyledText>
      </>
    );
  }

  return <></>;
};

export const GameOver = () => {
  const score = useRecoilValue(scoreState);
  return (
    <>
      <GameOverMessage score={score} />
      <StyledContainer>
        <StyledLabel>Your Score</StyledLabel>
        <ScoreContainer>
          <span>{score}</span>
        </ScoreContainer>
      </StyledContainer>
    </>
  );
};

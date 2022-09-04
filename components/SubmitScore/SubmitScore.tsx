import { useRecoilValue } from 'recoil';
import {
  StyledText,
  StyledForm,
  StyledPlayerInput,
  StyledLabel,
} from './SubmitScore.styled';
import { scoreState } from '../../utils/globalState';
import { Button } from '../Button/Button';

export const SubmitScore = () => {
  const score = useRecoilValue(scoreState);

  return (
    <>
      <h2>High Score</h2>
      <StyledText>
        Congrats! You&apos;ve made it to the leaderboard and scored {score}{' '}
        points! Submit your score below.
      </StyledText>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <StyledLabel htmlFor="playerName">Your Name</StyledLabel>
        <StyledPlayerInput
          type="text"
          placeholder=""
          id="playerName"
          name="playerName"
          maxLength={12}
          required
        />
        <Button label="Submit" onClick={() => alert('submitted')} />
      </StyledForm>
    </>
  );
};

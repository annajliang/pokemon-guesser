import { useRecoilValue } from 'recoil';
import {
  StyledText,
  StyledForm,
  StyledPlayerInput,
} from './SubmitScore.styled';
import { scoreState } from '../../../recoil';
import { Button } from '../../Button/Button';
import { Label } from '../../Form/Label/Label';

export const SubmitScore = () => {
  const score = useRecoilValue(scoreState);

  return (
    <>
      <h2 id="modalHeading">High Score</h2>
      <StyledText>
        Congrats! You&apos;ve made it to the leaderboard and scored {score}{' '}
        points! Submit your score below.
      </StyledText>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <Label forValue="playerName" label="Your Name" />
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

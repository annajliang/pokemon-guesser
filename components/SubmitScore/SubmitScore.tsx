import {
  StyledText,
  StyledForm,
  StyledPlayerInput,
  StyledLabel,
} from './SubmitScore.styled';

export const SubmitScore = () => {
  return (
    <>
      <h3>High Score</h3>
      <StyledText>
        Congrats! You&apos;ve made it to the leaderboard and scored 80 points!
        Submit your score below.
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
      </StyledForm>
    </>
  );
};

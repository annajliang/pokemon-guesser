import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import Image from 'next/image';
import { leaderboardState } from '../../../recoil';
import {
  StyledText,
  StyledForm,
  StyledPlayerInput,
  StyledSubmitStatus,
  StyledToolTip,
} from './SubmitScore.styled';
import { scoreState } from '../../../recoil';
import { Button } from '../../Button/Button';
import { Label } from '../../Form/Label/Label';

export const SubmitScore = () => {
  const [playerName, setPlayerName] = useState('');
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const [tooltip, setToolTip] = useState({
    message: '',
    isShown: false,
  });
  const score = useRecoilValue(scoreState);
  const setLeaderboard = useSetRecoilState(leaderboardState);

  const getScores = async () => {
    try {
      const response = await fetch('/api/leaderboard');

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPlayerToDb = async (name: string, score: number) => {
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { message } = await response.json();
      setIsScoreSubmitted(true);
      setToolTip({ ...tooltip, message });
      getScores();
    } catch (err) {
      console.log(err);
      setIsScoreSubmitted(true);
      setToolTip({
        ...tooltip,
        message: 'Failed to submit score. Try again!',
      });
    }
  };

  const submitScore = () => {
    if (playerName.trim()) {
      addPlayerToDb(playerName, score);
    } else {
      setToolTip({ ...tooltip, isShown: true });
    }
  };

  return (
    <>
      <h2 id="modalHeading">Congratulations!</h2>
      <StyledText>
        You&apos;ve made it to the leaderboard and scored {score} points! Submit
        your score below.
      </StyledText>
      <StyledForm
        onSubmit={(e) => e.preventDefault()}
        onFocus={() => setToolTip({ ...tooltip, isShown: false })}
      >
        <Label forValue="playerName" label="Your Name" />
        <StyledPlayerInput
          type="text"
          placeholder=""
          id="playerName"
          name="playerName"
          maxLength={12}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        {isScoreSubmitted ? (
          <StyledSubmitStatus>{tooltip.message}</StyledSubmitStatus>
        ) : (
          <Button label="Submit" onClick={submitScore} />
        )}
        {tooltip.isShown && (
          <StyledToolTip>
            <Image
              src="/assets/error.svg"
              alt=""
              width={25}
              height={25}
              priority
            />
            <p>Please enter a valid name.</p>
          </StyledToolTip>
        )}
      </StyledForm>
    </>
  );
};

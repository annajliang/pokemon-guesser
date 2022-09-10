import { leaderboardState } from '../../../recoil';
import { useRecoilValue } from 'recoil';
import { StyledRanking, StyledText } from './Leaderboard.styled';

export const Leaderboard = () => {
  const leaderboard = useRecoilValue(leaderboardState);

  return (
    <>
      <h2 id="modalHeading">Leaderboard</h2>
      {leaderboard.length ? (
        <StyledRanking>
          <></>
        </StyledRanking>
      ) : (
        <StyledText>
          None yet. Be the first to get on the leaderboard!
        </StyledText>
      )}
    </>
  );
};

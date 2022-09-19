import { leaderboardState } from '../../../recoil';
import { useRecoilValue } from 'recoil';
import { StyledRanking } from './Leaderboard.styled';
import { Player } from './Player';
import { StyledText } from '../../../styles/Global';

export const Leaderboard = () => {
  const leaderboard = useRecoilValue(leaderboardState);

  return (
    <>
      <h2 id="modalHeading">Leaderboard</h2>
      {leaderboard.length ? (
        <StyledRanking>
          {leaderboard.map((player, i) => {
            const rank = i + 1;
            return <Player key={player._id} rank={rank} player={player} />;
          })}
        </StyledRanking>
      ) : (
        <StyledText>
          None yet. Be the first to get on the leaderboard!
        </StyledText>
      )}
    </>
  );
};

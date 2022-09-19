import { Medal } from './Medal';
import { StyledPlayer, StyledScore } from './Player.styled';

interface PlayerProps {
  rank: number;
  player: {
    name: string;
    score: number;
  };
}

export const Player = ({ rank, player }: PlayerProps) => {
  return (
    <StyledPlayer>
      <div>
        <p>{rank}</p>
        <Medal rank={rank} />
        <p>{player.name}</p>
      </div>
      <StyledScore>{player.score} pts.</StyledScore>
    </StyledPlayer>
  );
};

import { StyledStatus } from './Status.styled';
import { Timer } from '../Timer/Timer';
import { Score } from '../Score/Score';

export const Status = () => {
  return (
    <StyledStatus>
      <Timer />
      <Score />
    </StyledStatus>
  );
};

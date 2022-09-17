import { StyledStatus } from './MobileStatus.styled';
import { Timer } from '../Timer/Timer';
import { Score } from '../Score/Score';

export const MobileStatus = () => {
  return (
    <StyledStatus>
      <Timer />
      <Score />
    </StyledStatus>
  );
};

import { StyledNav } from './Navigation.styled';
import { Button } from '../Button/Button';

export const Navigation = () => {
  return (
    <StyledNav>
      <Button
        label="Leaderboard"
        variant="modal"
        showModal={() => {
          alert('show modal');
        }}
      />
    </StyledNav>
  );
};

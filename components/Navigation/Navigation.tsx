import { useRecoilState } from 'recoil';
import { showModalsState } from '../../recoil';
import { StyledNav } from './Navigation.styled';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Leaderboard } from '../Modal/Leaderboard/Leaderboard';

export const Navigation = () => {
  const [showModals, setShowModals] = useRecoilState(showModalsState);
  const open = () => {
    setShowModals({ ...showModals, leaderboard: true });
  };
  const close = () => {
    setShowModals({ ...showModals, leaderboard: false });
  };

  return (
    <StyledNav>
      {showModals.leaderboard && (
        <Modal
          showDialog={showModals.leaderboard}
          closeModal={close}
          variant="leaderboard"
        >
          <Leaderboard />
        </Modal>
      )}
      <Button label="Leaderboard" variant="modal" onClick={open} />
    </StyledNav>
  );
};

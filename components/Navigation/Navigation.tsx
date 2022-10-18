import { useRecoilState } from 'recoil';
import { showModalsState } from '../../recoil';
import { StyledNav } from './Navigation.styled';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Leaderboard } from '../Modal/Leaderboard/Leaderboard';
import { Disclaimer } from '../Modal/Disclaimer/Disclaimer';

export const Navigation = () => {
  const [showModals, setShowModals] = useRecoilState(showModalsState);
  const open = (variant: { [key: string]: boolean }) => {
    setShowModals({ ...showModals, ...variant });
  };
  const close = (variant: { [key: string]: boolean }) => {
    setShowModals({ ...showModals, ...variant });
  };

  return (
    <StyledNav>
      {showModals.leaderboard && (
        <Modal
          showDialog={showModals.leaderboard}
          // closeModal={() => close({ leaderboard: false })}
          variant="leaderboard"
        >
          <Leaderboard />
        </Modal>
      )}

      {showModals.disclaimer && (
        <Modal
          showDialog={showModals.disclaimer}
          closeModal={() => close({ disclaimer: false })}
          variant="disclaimer"
        >
          <Disclaimer />
        </Modal>
      )}
      <Button
        label="Leaderboard"
        variant="modal"
        onClick={() => open({ leaderboard: true })}
      />
      <Button
        label="Disclaimer"
        variant="modal"
        onClick={() => open({ disclaimer: true })}
      />
    </StyledNav>
  );
};

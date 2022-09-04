import { useRecoilState } from 'recoil';
import { showDialogState } from '../../utils/globalState';
import { StyledNav } from './Navigation.styled';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export const Navigation = () => {
  const [showDialog, setShowDialog] = useRecoilState(showDialogState);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <StyledNav>
      <Modal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        closeModal={close}
        variant="leaderboard"
      />
      <Button label="Leaderboard" variant="modal" onClick={open} />
    </StyledNav>
  );
};

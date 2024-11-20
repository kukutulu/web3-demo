import { Dialog, DialogContent } from '@mui/material';
import ModalListWalletConnect from './modal-list-wallet-connect';
import { useModalStateData, useModalStateFunction } from 'src/jotai/modal/modal-state';

export default function ModalConnectWallet() {
  const modal = useModalStateData();
  const { closeModal } = useModalStateFunction();

  return (
    <Dialog fullWidth maxWidth={'xsm'} open={modal.connectWallet} onClose={() => closeModal('connectWallet')}>
      <DialogContent sx={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ModalListWalletConnect />
      </DialogContent>
    </Dialog>
  );
}

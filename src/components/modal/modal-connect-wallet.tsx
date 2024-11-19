import { Button, Box, Dialog, DialogContent } from '@mui/material';
import { useModalFunction } from 'src/jotai/modal/modal';
import ModalListWalletConnect from './modal-list-wallet-connect';
import { IconWallet } from 'src/assets/icon';
import { useModalConnectWallet } from 'src/jotai/modal/modal-connect-wallet';

export default function ModalConnectWallet() {
  const modal = useModalConnectWallet();
  console.log('🚀 ~ ModalConnectWallet ~ modal:', modal);
  const { openModal } = useModalFunction();

  return (
    <Dialog fullWidth maxWidth={modal.modalProps?.maxWidth || 'xsm'} open={modal.open} {...modal.modalProps}>
      <DialogContent sx={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => openModal({ title: 'Choose Wallet', content: <ModalListWalletConnect />, modalProps: { maxWidth: 'xs' } })}
          sx={{ textAlign: 'center', height: { xs: '36px', xsm: '44px' } }}
        >
          <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' }, mr: 1, width: '130px' }}>
            Connect Wallet
          </Box>
          <IconWallet fontSize="large" sx={{ display: { xs: 'block', sm: 'none' } }} />
        </Button>
      </DialogContent>
    </Dialog>
  );
}

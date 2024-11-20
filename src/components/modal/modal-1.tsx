import { Box, Button, Dialog, Typography } from '@mui/material';
import { useModalStateData, useModalStateFunction } from 'src/jotai/modal/modal-state';

export default function Modal1() {
  const modal = useModalStateData();
  const { closeModal } = useModalStateFunction();

  return (
    <Dialog open={modal.modal1}>
      <Box height={'200px'} width={'400px'}>
        <Typography>Modal 1</Typography>
        <Button onClick={() => closeModal('modal1')}>Close Modal</Button>
      </Box>
    </Dialog>
  );
}

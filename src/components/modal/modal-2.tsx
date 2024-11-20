import { Box, Button, Dialog, Typography } from '@mui/material';
import { useModalStateData, useModalStateFunction } from 'src/jotai/modal/modal-state';

export default function Modal2() {
  const modal = useModalStateData();
  const { closeModal } = useModalStateFunction();

  return (
    <Dialog open={modal.modal2}>
      <Box height={'200px'} width={'400px'}>
        <Typography>Modal 2</Typography>
        <Button onClick={() => closeModal('modal2')}>Close Modal</Button>
      </Box>
    </Dialog>
  );
}

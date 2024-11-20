import { Box } from '@mui/material';
import Content from 'src/components/content';
import Header from 'src/components/header';
import ModalConnectWallet from 'src/components/modal/modal-connect-wallet';
import AppProvider from 'src/jotai/app-provider';

export default function Layout() {
  return (
    <>
      <AppProvider>
        <Box sx={{ pt: 4 }}>
          <Header />
          <Content headerHeight="64px" />
          <ModalConnectWallet />
        </Box>
      </AppProvider>
    </>
  );
}

import { useThemeFunction } from 'src/jotai/theme/theme';
import ButtonConnectWallet from './button/button-connect-wallet';
import { Box, Button } from '@mui/material';
import { MuiImage } from './utils';
import StaggeredDropDown from './menu/dropdown-menu';
import ButtonSelectChain from './button/button-select-chain';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { toggleThemeMode } = useThemeFunction();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', mx: 4, backgroundColor: '#f8f9fa' }}>
      <MuiImage height={'40px'} src="path/to/logo.png" alt="App Logo" />
      <Button onClick={toggleThemeMode}>{t('toggleThemeButton')}</Button>
      <StaggeredDropDown />
      <ButtonSelectChain />
      <ButtonConnectWallet />
    </Box>
  );
}

import { Box, Button, Collapse, Divider, Grow, MenuItem, Popover, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MouseEvent, useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { HourglassEmpty } from '@mui/icons-material';
import { TAppChainId } from 'src/jotai/wallet/type';
import { infoChain } from 'src/jotai/wallet/config';
import { rotateInfinity } from 'src/animation/rotate';
import { RotateIcon } from '../utils';

export default function ButtonSelectChain() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const chainIdConnected = useChainId();
  const { chains, switchChain, isPending } = useSwitchChain();

  const IconChainConnected = infoChain[chainIdConnected as TAppChainId]?.logoChain;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setTimeout(() => {
      setAnchorEl(null);
    }, 300);
  };

  const onSwitchChain = (item: number) => {
    switchChain({ chainId: item as TAppChainId });
    handleClose();
  };

  return (
    <Box sx={{ position: 'relative', mr: 1 }}>
      {isPending ? (
        <Button
          startIcon={
            <HourglassEmpty
              sx={{
                fontSize: '17px',
                animation: rotateInfinity,
              }}
            />
          }
          variant="outlined"
          sx={{ borderColor: '#2465DE', color: 'white', height: { xs: '36px', xsm: '44px' } }}
        >
          <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
            Switching...
          </Box>
        </Button>
      ) : (
        <Button onClick={handleClick} variant="contained" sx={{ borderColor: '#2465DE', height: { xs: '36px', xsm: '44px' } }} endIcon={<RotateIcon isOpen={openMenu} Icon={ExpandMoreIcon} />}>
          <IconChainConnected sx={{ fontSize: '24px', mr: { xs: 0, sm: 1 } }} />
          <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
            <Typography color="white">{infoChain[chainIdConnected as TAppChainId]?.name}</Typography>
          </Box>
        </Button>
      )}

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Grow}
      >
        <Typography sx={{ textAlign: 'center', mb: 1 }} variant="body2" fontWeight={600}>
          Select a network
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {chains.map((chain, index) => {
          if (chain.id !== chainIdConnected) {
            const MenuIcon = infoChain[chain.id as TAppChainId]?.logoChain;
            return (
              <Collapse
                key={chain.id}
                in={openMenu}
                timeout={300 + index * 100} // Stagger the animations like StaggeredDropDown
              >
                <MenuItem sx={{ mb: 0.5 }} onClick={() => onSwitchChain(chain.id)}>
                  <MenuIcon sx={{ fontSize: '24px', mr: 1 }} />
                  <Typography color="black">{infoChain[chain.id as TAppChainId]?.name || 'Unknown'}</Typography>
                </MenuItem>
              </Collapse>
            );
          }
        })}
      </Popover>
    </Box>
  );
}

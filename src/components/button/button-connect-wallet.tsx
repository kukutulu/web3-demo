import { CopyAll, HourglassEmpty } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, ClickAwayListener, Divider, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IconWallet } from 'src/assets/icon';
import { infoChain, infoWallet } from 'src/jotai/wallet/config';
import { useAccount, useChainId, useConnections, useDisconnect } from 'wagmi';
import { TAppChainId } from 'src/jotai/wallet/type';
import { useModalStateFunction } from 'src/jotai/modal/modal-state';

function NotConnectedButton() {
  const { openModal } = useModalStateFunction();

  return (
    <>
      <Button variant="contained" onClick={() => openModal('connectWallet')} sx={{ textAlign: 'center', height: { xs: '36px', xsm: '44px' } }}>
        <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' }, mr: 1, width: '130px' }}>
          Connect Wallet
        </Box>
        <IconWallet fontSize="large" sx={{ display: { xs: 'block', sm: 'none' } }} />
      </Button>
    </>
  );
}

function ConnectingButton() {
  return (
    <Box>
      <Button
        variant="gradient"
        startIcon={
          <HourglassEmpty
            sx={{
              fontSize: '17px',
            }}
          />
        }
        sx={{ height: { xs: '36px', xsm: '44px' } }}
      >
        <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' } }}>
          Connecting...
        </Box>
      </Button>
    </Box>
  );
}

function ConnectedButton({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { disconnectAsync } = useDisconnect();
  const chainIdConnected = useChainId();
  const infoChainConnected = infoChain[chainIdConnected as TAppChainId];

  const connections = useConnections();

  const ChainIcon = infoChainConnected?.logoChain;

  const handleClick = () => {
    setOpen((prev) => !prev);
    setCopied(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function _copyText(_address: string) {
    // copyTextToClipboard(_address);
    setCopied(true); // Copy success
  }

  async function clickDisconnect() {
    await disconnectAsync();
    window.location.reload();
  }

  useEffect(() => {
    if (open) {
      setCopied(false);
    }
  }, [open]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <Button
          onClick={handleClick}
          variant="gradient"
          sx={{ height: { xs: '36px', xsm: '44px' } }}
          endIcon={<ExpandMoreIcon sx={{ color: 'white', fontSize: '24px', display: { xs: 'block', sm: 'none' } }} />}
        >
          <Box component={'span'} sx={{ display: { sm: 'block', xs: 'none' }, mr: 1 }}>
            {address}
          </Box>
          <IconWallet fontSize="large" />
        </Button>
        {open ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              minWidth: '200px',
              bgcolor: 'background.paper',
              borderRadius: '16px',
              boxShadow: 4,
              py: 2,
            }}
          >
            <Box sx={{ display: 'flex', placeItems: 'center', px: 2, justifyContent: 'center', mb: 1 }}>
              <ChainIcon sx={{ fontSize: '25px', mr: 1 }} />
              <Typography variant="body2" fontWeight={600} textAlign={'center'} sx={{ display: 'block' }}>
                {infoChainConnected?.name}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', placeItems: 'center', px: 2, mt: 2 }}>
              <Box mr={'auto'} textAlign={'left'}>
                <Typography variant="body3" color={'text.secondary'}>
                  Wallet
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {connections[0]?.connector?.name}
                </Typography>
              </Box>
              <img src={connections[0]?.connector?.icon || infoWallet[connections[0]?.connector.id]?.logoWallet} alt="logo wallet" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
            </Box>

            <MenuItem sx={{ mt: 1, flexDirection: 'column', placeItems: 'start' }} onClick={() => _copyText(address)}>
              <Typography variant="body3" color={'text.secondary'}>
                Account address
              </Typography>
              <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                <Typography variant="body2" fontWeight={600}>
                  {address}
                </Typography>
                {copied ? <CheckIcon sx={{ fontSize: '20px' }} /> : <CopyAll sx={{ fontSize: '20px' }} />}
              </Box>
            </MenuItem>
            <MenuItem sx={{ mt: 1 }} onClick={() => clickDisconnect()}>
              <Typography variant="body2" color={'text.primary'} fontWeight={500}>
                Disconnect
              </Typography>
            </MenuItem>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}

export default function ButtonConnectWallet() {
  const { isConnecting, address } = useAccount();
  if (isConnecting) return <ConnectingButton />;
  if (address) return <ConnectedButton address={address} />;
  return <NotConnectedButton />;
}

import { Box, Typography } from '@mui/material';
import { useModalFunction } from 'src/jotai/modal/modal';
import { infoChain, infoWallet } from 'src/jotai/wallet/config';
import { TAppChainId } from 'src/jotai/wallet/type';
import { Connector, useChainId, useConnect } from 'wagmi';

export default function ModalListWalletConnect() {
  const { connectAsync, connectors, isPending } = useConnect();
  const { closeModal } = useModalFunction();
  const chainIdConnected = useChainId();
  const infoChainConnected = infoChain[chainIdConnected as TAppChainId];
  const ChainIcon = infoChainConnected.logoChain;
  const isNotInstallWalletList = Object.keys(infoWallet).filter((item) => connectors.findIndex((connector) => connector.id === item) < 0);

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = (url: string) => {
    window.open(url);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', placeItems: 'center', px: 2, justifyContent: 'center', mb: 1 }}>
        <ChainIcon sx={{ fontSize: '32px', mr: 1 }} />
        <Typography variant="body2" fontWeight={600} textAlign={'center'} sx={{ display: 'block', fontSize: '25px' }}>
          {infoChainConnected.name}
        </Typography>
      </Box>
      {isPending ? (
        <Box mt={2} mb={4}>
          Loading
        </Box>
      ) : (
        <>
          <Typography variant="h6" color="skyblue">
            Installed
          </Typography>
          <Box mt={2} mb={4}>
            {connectors.map((connector, index) => {
              const walletInfo = infoWallet[connector.id];
              if (connector.id === 'io.metamask') {
                return null;
              }

              return (
                <Box
                  key={connector.id + index}
                  sx={{
                    borderRadius: '8px',
                    px: 2.5,
                    display: 'flex',
                    gap: 1.5,
                    py: 1,
                    mb: 1,
                    placeItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                    bgcolor: '#3396ff17',
                  }}
                  onClick={() => handleConnect(connector)}
                >
                  <img src={connector.icon || walletInfo?.logoWallet} alt={`logo wallet ${connector.name}`} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                  <Typography className="wallet-name" variant="body2" fontWeight={600} sx={{ transition: 'color 0.2s' }}>
                    {connector.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {isNotInstallWalletList.length > 0 ? (
            <>
              <Typography variant="h6">Other</Typography>
              <Box mt={2} mb={4}>
                {isNotInstallWalletList.map((key, index) => {
                  const connector = infoWallet[key];
                  return (
                    <Box
                      key={connector.name + index}
                      sx={{
                        borderRadius: '8px',
                        px: 2.5,
                        display: 'flex',
                        gap: 1.5,
                        py: 1,
                        mb: 1,
                        placeItems: 'center',
                        cursor: 'pointer',
                        '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                        bgcolor: '#3396ff17',
                      }}
                      //   onClick={() => handleConnect(connector)}
                      onClick={() => handleRedirect(connector.url)}
                    >
                      <img src={connector.logoWallet} alt={`logo wallet ${connector.name}`} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                      <Typography className="wallet-name" variant="body2" fontWeight={600} sx={{ transition: 'color 0.2s' }}>
                        {connector.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </>
          ) : null}
        </>
      )}
    </Box>
  );
}

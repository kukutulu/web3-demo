import { createClient, http } from 'viem';
import { bsc, bscTestnet } from 'viem/chains';
import { createConfig } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { TAppChainId } from './type';
import { TAppDenom } from 'src/constants/map-token-to-icon';
import { IconBNB, SvgComponent } from 'src/assets/token-icon';
import { imagePath } from 'src/constants/image-path';

export const configEvmChain = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({
      projectId: '3f1b6f6df161912ee478fb745054babb',
      showQrModal: true,
      qrModalOptions: {
        themeVariables: {
          '--wcm-z-index': '1400',
        },
      },
    }),
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

export const infoChain: { [key in TAppChainId]: { logoChain: SvgComponent; name: string; baseToken: TAppDenom; url: string } } = {
  [bsc.id]: {
    logoChain: IconBNB,
    name: 'BSC',
    baseToken: 'BNB',
    url: bsc.blockExplorers.default.url,
  },
  [bscTestnet.id]: {
    logoChain: IconBNB,
    name: 'BSC testnet',
    baseToken: 'BNB',
    url: bsc.blockExplorers.default.url,
  },
};

export const infoWallet: { [key in string]: { logoWallet: string; name: string; url: string } } = {
  ['metaMask']: { logoWallet: imagePath.Logo_Metamask, name: 'Metamask', url: 'https://metamask.io' },
  ['walletConnect']: { logoWallet: imagePath.Logo_WalletConnect, name: 'WalletConnect', url: 'https://explorer.walletconnect.com' },
  ['app.keplr']: { logoWallet: imagePath.Logo_Keplr, name: 'Keplr', url: 'https://keplr.app' },
  ['io.cosmostation']: { logoWallet: imagePath.Logo_Cosmostation, name: 'Cosmostation Wallet', url: 'https://cosmostation.io' },
};

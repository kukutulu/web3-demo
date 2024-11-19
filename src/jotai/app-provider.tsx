import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { configEvmChain } from './wallet/config';
import { appStore } from './app-store';
import ThemeWrapper from './theme/theme-wrapper';
import { ReactNode } from 'react';

export const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={configEvmChain}>
      <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
          <ThemeWrapper>
            {children}
            {/* <Layout>
              <Outlet />
              <ModalConnectWallet />
            </Layout> */}
          </ThemeWrapper>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

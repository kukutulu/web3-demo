import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { configEvmChain } from './wallet/config';
import { appStore } from './app-store';
import ThemeWrapper from './theme/theme-wrapper';
import { ReactNode } from 'react';
import queryClient from './query-client';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={configEvmChain}>
      <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
          <ThemeWrapper>
            {children}
            <DevTools />
          </ThemeWrapper>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

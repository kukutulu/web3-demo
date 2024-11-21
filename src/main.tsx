import { createRoot } from 'react-dom/client';
import RouterUrl from './routes.tsx';
import { BrowserRouter } from 'react-router-dom';

import './i18n.ts';
import { Suspense } from 'react';

createRoot(document.getElementById('root')!).render(
  <Suspense fallback="loading">
    <BrowserRouter>
      <RouterUrl />
    </BrowserRouter>
  </Suspense>
);

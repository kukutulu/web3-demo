import { createRoot } from 'react-dom/client';
import RouterUrl from './routes.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RouterUrl />
  </BrowserRouter>
);

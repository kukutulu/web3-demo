import { useRoutes } from 'react-router-dom';
import Home from './pages/home';
import Layout from './layout/layout';

export default function RouterUrl() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        {
          path: 'tiu',
          element: <h1>Tiu</h1>,
        },
      ],
    },
  ]);
}

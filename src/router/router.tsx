import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home.tsx';
import PersonDetails from '../components/PersonDetails/PersonDetails.tsx';
import personDataLoader from '../components/PersonDetails/loader.ts';
import ErrorPage from '../pages/ErrorPage/ErrorPage.tsx';

export const routes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'detail/:id',
        element: <PersonDetails />,
        loader: personDataLoader,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;

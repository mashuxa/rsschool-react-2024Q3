import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles.css';
import router from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>,
);

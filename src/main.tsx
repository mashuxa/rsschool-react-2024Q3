import ReactDOM from 'react-dom/client';
import './styles.css';
import router from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);

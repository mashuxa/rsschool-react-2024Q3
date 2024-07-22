import ReactDOM from 'react-dom/client';
import './styles.css';
import router from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

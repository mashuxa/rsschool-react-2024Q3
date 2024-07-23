import ReactDOM from 'react-dom/client';
import './styles.css';
import router from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>,
);

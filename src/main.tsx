import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  </React.StrictMode>,
);

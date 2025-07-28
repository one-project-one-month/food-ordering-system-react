import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error("Root element not found");
}

createRoot(rootEl).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

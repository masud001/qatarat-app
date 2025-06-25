import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

(async () => {
  // Enable MSW in development, or if VITE_ENABLE_MSW is set to "true"
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true") {
    try {
      const { worker } = await import('./mocks/browser.ts');
      await worker.start();
      console.log('MSW started');
    } catch (err) {
      console.warn('MSW failed to start:', err);
    }
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();

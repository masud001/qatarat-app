import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  // Enable MSW in development, or if VITE_ENABLE_MSW is set to "true"
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true") {
    const { worker } = await import('./mocks/browser.ts');
    await worker.start();
  }
}

enableMocking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
